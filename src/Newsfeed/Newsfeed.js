import React, { Component } from 'react';
import axios from 'axios';
import { dummy_posts } from '../Environment/environment';
import { Redirect } from 'react-router-dom'


import { Link } from 'react-router-dom';
import Post from '../Post/Post'
import postService from '../Services/postService';
import newsfeedService from '../Services/newsfeedService';

class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
        };
    }

    async componentDidMount() {
        const newsfeed = await newsfeedService.get()

        const post_promises = []
        for (let pf of newsfeed.data) {
            post_promises.push(postService.get_by_id(pf.p_id))
        }

        Promise.all(post_promises).then(resolves => {
            let posts = []
            for (let post of resolves) {
                posts.push(post.data)
            }
            this.setState({
                posts: posts,
            });
        })
    }



    render() {

        if (!localStorage.getItem('identity')) {
            return <Redirect to='/login' />
        }

        const { posts } = this.state;
        if (!posts || posts.length === 0) return <p>Loading posts...</p>;
        return (
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
                {posts.map(post => (
                    <div className="my-5">
                        <Post post_id={post.id}></Post>
                    </div>
                ))}
            </div>
        )
    }
}

export default Newsfeed;