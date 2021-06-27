import React, {Component, useState }  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import postService from '../Services/postService'

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
    };
  }

  async componentDidMount() {
    let response = await postService.get_by_id(this.props.post_id);
    let post = response.data

    this.setState({
      post
    });
  }

  find_hashtags(description) {
    let words = description.split(' ');
    let mapped = words.map( e => e[0] == '#' ? ( <Link to="/" className="nounderline"> {e} </Link> ) : ( <span> {e} </span> ))
    return mapped
  }

  commas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  render() {
    const { post } = this.state;
    if (post === null) return <p>Loading post...</p>;
    return (
        <div className="col-12 border border-light bg-white pb-4">
            <div className="col-12 px-4 py-3">
                {/* <img className="round wh-30 mx-2" src={post.user_profile_pic}></img>
                <Link class="mx-2 text-dark nounderline bold" to="/">{post.username}</Link> */}
                <p>{post.id}</p>
            </div>
            <div className="col-12">
                <img className="post-image" src={post.image_url}></img>
            </div>
            <div className="col-12 px-4 py-3 d-flex justify-content-between border-bottom border-light">
                <div>
                    <i class="mx-2 text-dark far fa-thumbs-up fa-2x like-hover"></i>
                    <i class="mx-2 text-dark far fa-thumbs-down fa-2x dislike-hover"></i>
                </div>
                <div>
                    <i class="mx-2 text-dark far fa-bookmark fa-2x bookmark-hover"></i>
                </div>
            </div>
            <div className="col-12 px-4 py-1">
                {/* <div>{this.commas(post.likes)} likes</div>
                <div>{this.commas(post.dislikes)} dislikes</div> */}
            </div>
            <div className="col-12 px-4 mb-3">
                <Link class="text-dark nounderline bold" to="/">{post.username}</Link>
                <span class="mx-2">{this.find_hashtags(post.description)}</span>
            </div>
            { 
              post.comments && post.comments.length > 0 && post.comments.map(comment => (
                
                <div className="col-12 px-4">
                  <Link class="text-dark nounderline bold" to="/">{comment.username}</Link>
                  <span class="mx-2">{this.find_hashtags(comment.text)}</span>
                </div>
              ))
            }


        </div>
    )
  }
}

export default Post;