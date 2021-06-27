import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

class PostThumbnail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
        };
    }

    async componentDidMount() {
        this.setState({
          post: this.props.post
        });
    }



    render() {
        const { post } = this.state;
        if (post === null) return <p>Loading post ...</p>;
        return (
            <Link to={`/post/${post.id}`} className="col-lg-4 col-md-4 col-6 m-0 p-0 thumbnail cursor-pointer">
                <img className="post-image-thumbnail" src={post.image_url}></img>
                <p class="img__description text-light noselect">
                    <span class="mx-2 far fa-thumbs-up"> X </span>
                    &nbsp;
                    &nbsp;
                    <span class="mx-2 far fa-comment"> X </span>
                </p>
            </Link>
        )
    }
}

export default PostThumbnail;