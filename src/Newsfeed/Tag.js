import React, { Component } from 'react';
import axios from 'axios';
import { dummy_posts } from '../Environment/environment';
import { Redirect } from 'react-router-dom'


import { Link } from 'react-router-dom';
import Post from '../Post/Post'
import tagService from '../Services/tagService';
import postService from '../Services/postService';

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
        };
    }

    async componentDidMount() {
        debugger;
        const { match: { params } } = this.props;
        let tag = params.tag
        const tags = await tagService.get(tag)

        const post_promises = []
        for (let pf of tags.data) {
            post_promises.push(postService.get_by_id(pf))
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
        const { posts } = this.state;
        if (!posts || posts.length === 0) return <p>Loading posts...</p>;
        return (
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-sm-12 row">
                {posts.map(post => (
                    <div className="my-5 col-6 px-5">
                        <Post post_id={post.id}></Post>
                    </div>
                ))}
            </div>
        )
    }
}

export default Tag;