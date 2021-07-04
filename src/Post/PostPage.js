import React, {Component, useState }  from 'react';
import {Link} from 'react-router-dom';
import { dummy_posts } from '../Environment/environment';
import Post from './Post';


class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post_id: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    let post_id = params.post_id
    this.setState({post_id})
  }

  render() {
    const { post_id } = this.state;
    if (!post_id) return <p>Loading post ...</p>;
    return (
        <div className="col-8 offset-2 my-5">
            <Post post_id={this.state.post_id}></Post>
        </div>
    )
  }
}

export default PostPage;