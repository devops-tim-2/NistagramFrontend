import React, { Component } from 'react';
import axios from 'axios';
import { dummy_posts } from '../Environment/environment';
import { Redirect } from 'react-router-dom'


import { Link } from 'react-router-dom';
import Post from '../Post/Post'
import Campaign from '../Campaign/Campaign'
import postService from '../Services/postService';
import newsfeedService from '../Services/newsfeedService';
import campaignService from '../Services/campaignService';

class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_page: 1,
            posts: null,
            campaigns: null,
        };
    }

    async componentDidMount() {
        const newsfeed = await newsfeedService.get(this.state.current_page)
        const campaigns = await newsfeedService.get_campaigns(this.state.current_page)
        let xposts = []
        let xcampaigns = []
        for (let pf of newsfeed.data) {
            xposts.push(pf.p_id)
        }
        for (let pf of campaigns.data) {
            xcampaigns.push(pf.c_id)
        }
        this.setState({posts:xposts, campaigns:xcampaigns})
    }


    async load_more() {
        let cp = this.state.current_page;
        cp+=1; 
        const newsfeed = await newsfeedService.get(cp)
        const campaigns = await newsfeedService.get_campaigns(cp)
        let yposts = JSON.parse(JSON.stringify(this.state.posts));
        let ycampaigns = JSON.parse(JSON.stringify(this.state.campaigns));
        for (let pf of newsfeed.data) {
            yposts.push(pf.p_id)
        }
        for (let pf of campaigns.data) {
            ycampaigns.push(pf.c_id)
        }

        this.setState({
            posts: yposts,
            campaigns: ycampaigns,
            current_page: cp
        })


    }

    render() {

        if (!localStorage.getItem('identity')) {
            return <Redirect to='/login' />
        }

        const { posts, campaigns } = this.state;
        if (!posts || posts.length === 0) return <p>Loading posts...</p>;
        return (
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
                {campaigns.map(campaign => (
                    <div className="my-5">
                        <Campaign campaign_id={campaign}></Campaign>
                    </div>
                ))}
                {posts.map(post => (
                    <div className="my-5">
                        <Post post_id={post}></Post>
                    </div>
                ))}
                <div className="col-2 offset-4 btn btn-primary" onClick={() => this.load_more()}>Load more</div>
            </div>
        )
    }
}

export default Newsfeed;