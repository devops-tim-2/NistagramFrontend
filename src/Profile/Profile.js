import React, { Component } from 'react';
import axios from 'axios';
import { dummy_posts, dummy_user } from '../Environment/environment';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';
import userService from '../Services/userService'
import postService from '../Services/postService'
import PostThumbnail from '../Profile/PostThumbnail'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            posts: undefined,
        };
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        let user_id = params.user_id
        const user = (await userService.get(user_id)).data
        postService.get_users_posts(user.id).then(posts => {
            this.setState({
                user,
                posts: posts.data
            });
        }).catch(err => {
            this.setState({
                user,
                posts: null
            });

        })
    }



    render() {
        const { posts, user } = this.state;

        return (
            <div className="container">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12 row my-4">
                    {user && (
                        <div className="row">
                            <div className="w-200">
                                <img src={user.profile_image_link} class="profile-pic round mb-4 border"></img>

                                {/* <div className="col-10 offset-1 btn btn-primary btnh my-1"> Follow </div>
                                <div className="col-10 offset-1 btn btn-danger btnh my-1"> Block </div> */}

                                {/* <div className="col-10 offset-1 btn btn-warning btnh my-1"> Mute </div>
                                <div className="col-10 offset-1 btn btn-danger btnh my-1"> Unfollow </div> */}


                                {/* <div className="col-10 offset-1 btn btn-success btnh my-1"> Add post </div>
                                <div className="col-10 offset-1 btn btn-primary btnh my-1"> Follow requests </div>
                                <div className="col-10 offset-1 btn btn-primary btnh my-1"> Edit profile </div>
                                <div className="col-10 offset-1 btn btn-danger btnh my-1"> Logout </div> */}
                            </div>
                            <div className="w-100-200 text-left">
                                <h3 className="mb-3">{user.username}</h3>
                                <table className="w-100 text-center">
                                    <tr>
                                        <td className="border-end border-primary"><h6>Posts</h6></td>
                                        <td className="border-end border-primary"><h6>Followers</h6></td>
                                        <td><h6>Following</h6></td>
                                    </tr>
                                    <tr>
                                        <td className="border-end border-primary"><h4>{'X'}</h4></td>
                                        <td className="border-end border-primary"><h4>{'X'}</h4></td>
                                        <td><h4>{'X'}</h4></td>
                                    </tr>
                                </table>
                                <p className="text-justify mt-3">{user.bio}</p>
                                <a href={user.website}>{user.website}</a>
                            </div>
                        </div>
                    )}
                </div>
                <hr className="col-6 offset-3"></hr>
                <div className="col-lg-10 offset-lg-1 col-md-10 offset-md-1 col-12 row my-4">
                    {posts && posts.length > 0 && posts.map((post,i) => (
                        <PostThumbnail post={post}></PostThumbnail>
                    ))}

                    { posts === null && (
                        <p className="text-center">User profile is private</p>
                    ) }
                </div>

            </div>
        )
    }
}

export default Profile;