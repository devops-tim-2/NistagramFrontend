import React, {Component, useState }  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import postService from '../Services/postService'
import userService from '../Services/userService'
import { Button, FormGroup, FormControl } from "react-bootstrap";


class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null,
      commentText: null,
    };
  }

  async componentDidMount() {
    let response = await postService.get_by_id(this.props.post_id);
    let users = {}
    let owner = (await userService.get(response.data.user_id)).data;
    users[response.data.user_id] = owner;
    response.data.owner = {username: owner.username, profile_image_link: owner.profile_image_link};
        for (let cmnti in response.data.comments) {
          let cmnt = response.data.comments[cmnti]
          if (!users[cmnt.user_id]) {
            let user = (await userService.get(cmnt.user_id)).data;
            users[cmnt.user_id] = user;
            cmnt.username = user.username;
          } else {
            cmnt.username = users[cmnt.user_id].username;
          }
        }
    let post = response.data
    this.setState({
      post,
      commentText: '',
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

  setCommentText(value) { this.setState({commentText: value}) }

  commentotttt() {
    postService.comment(this.state.post.id, this.state.commentText).then(async () => {

      let response = await postService.get_by_id(this.props.post_id);
      let users = {}
      let owner = (await userService.get(response.data.user_id)).data;
      users[response.data.user_id] = owner;
      response.data.owner = {username: owner.username, profile_image_link: owner.profile_image_link};
          for (let cmnti in response.data.comments) {
            let cmnt = response.data.comments[cmnti]
            if (!users[cmnt.user_id]) {
              let user = (await userService.get(cmnt.user_id)).data;
              users[cmnt.user_id] = user;
              cmnt.username = user.username;
            } else {
              cmnt.username = users[cmnt.user_id].username;
            }
          }
      let post = response.data
        this.setState({
          post,
          commentText: '',
        });
    })
  }

  render() {
    const { post } = this.state;
    if (post === null) return <p>Loading post...</p>;
    return (
        <div className="col-12 border border-light pb-4">
            <div className="col-12 px-4 py-3">
                <img className="round wh-30 mx-2" src={post.owner.profile_image_link}></img>
                <Link class="mx-2 nounderline bold" to={`/profile/${post.user_id}`}>{post.owner.username}</Link>
            </div>
            <div className="col-12">
                <img className="post-image" src={post.image_url}></img>
            </div>
            <div className="col-12 px-4 py-3 d-flex justify-content-between border-bottom border-light">
                <div>
                    <i class="mx-2 text-dark far fa-thumbs-up fa-2x like-hover cursor-pointer"></i>
                    <i class="mx-2 text-dark far fa-thumbs-down fa-2x dislike-hover cursor-pointer"></i>
                </div>
                <div>
                    <i class="mx-2 text-dark far fa-bookmark fa-2x bookmark-hover cursor-pointer"></i>
                </div>
            </div>
            <div className="col-12 px-4 py-1">
                <div>{post.likes} likes</div>
                <div>{post.dislikes} dislikes</div>
            </div>
            <div className="col-12 px-4 my-3">
              <Link class="nounderline bold" to={`/profile/${post.user_id}`}>{post.owner.username}</Link>
                <span class="mx-2">{this.find_hashtags(post.description)}</span>
            </div>
            { 
              post.comments && post.comments.length > 0 && post.comments.map(comment => (
                
                <div className="col-12 px-4">
                  <Link class="nounderline bold" to={`/profile/${comment.user_id}`}>{comment.username}</Link>
                  <span class="mx-2">{this.find_hashtags(comment.text)}</span>
                </div>
              ))
            }
            {localStorage.getItem('identity') && (
              <div className="col-12 px-4 py-1 mt-3">
              <Link class="" to={`/profile/${JSON.parse(localStorage.getItem('identity')).id}`}>
                <img className="round wh-30 mx-2" src={JSON.parse(localStorage.getItem('identity')).profile_image_link || 'https://www.milton.edu/wp-content/uploads/2019/11/avatar-placeholder-250x300.jpg'}></img>
              </Link>
                <FormControl
                  type="text"
                  value={this.state.commentText}
                  onChange={e => this.setCommentText(e.target.value)}
                  placeholder="Add comment..."
                  className="d-inline-block w-100100"
              />
              <span>
                <i class="mx-2 text-dark far fa-comment fa-2x bookmark-hover cursor-pointer" onClick={() => this.commentotttt()}></i>
              </span>
            </div>
            )}
            
        </div>
    )
  }
}

export default Post;