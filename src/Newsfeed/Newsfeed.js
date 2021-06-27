import React, { Component } from 'react';
import axios from 'axios';
import { dummy_posts } from '../Environment/environment';
import { Redirect } from 'react-router-dom'


import { Link } from 'react-router-dom';
import Post from '../Post/Post'
import postService from '../Services/postService';

class Newsfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
        };
    }

    async componentDidMount() {
        const posts = await postService.get_all()

        this.setState({
            posts: posts.data,
        });
    }



    render() {

        if (!localStorage.getItem('identity')) {
            return <Redirect to='/login' />
        }

        const { posts } = this.state;
        if (posts === null) return <p>Loading posts ...</p>;
        return (
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12">
                {posts.map(post => (
                    <div className="my-5">
                        <Post post={post}></Post>
                    </div>
                ))}
            </div>
        )
    }
}

export default Newsfeed;