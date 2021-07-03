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
            follow_state: undefined,
            self_profile: false,
        };
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        let user_id = params.user_id

        const logged_in = !(!localStorage.getItem('identity'))
        const self_profile = logged_in?JSON.parse(localStorage.getItem('identity')).id == user_id:false
        let user = null;
        try {
            user = (await userService.get(user_id)).data
        } catch (error) {
            this.setState({
                user,
            });
            return;
        }
        let follow_state = {state: 'DNE'}

        try {
            follow_state = (await userService.get_follow(user_id)).data
        } catch (error) { }

        postService.get_users_posts(user.id).then(posts => {
            this.setState({
                user,
                logged_in,
                posts: posts.data, 
                follow_state,
                self_profile
            });
        }).catch(err => {
            this.setState({
                user,
                posts: err.response.status==404?[]:null, 
                logged_in,
                follow_state,
                self_profile
            });
        })
    }

    async follow() {
        userService.follow(this.state.user.id).then(async resp => {
            let follow_state = {state: 'DNE'}

            try {
                follow_state = (await userService.get_follow(this.state.user.id)).data
            } catch (error) { }

            
            this.setState({follow_state})

        }).catch(async err => {
            let follow_state = {state: 'DNE'}

            try {
                follow_state = (await userService.get_follow(this.state.user.id)).data
            } catch (error) { }

            this.setState({follow_state})
        });
    }


    logout() {
        userService.logout();
        window.location.href = '/login'
    }

    async block() {
        let block_state = {'blocked': false};
        try {
            block_state = (await userService.block(this.state.user.id)).data
            alert(block_state.blocked);
            this.props.history.push('/')
        } catch (error) { }
    }

    async mute() {
        let follow_state = this.state.follow_state;
        let mute_state = {'muted': follow_state.mute};
        try {
            mute_state = (await userService.mute(this.state.user.id)).data
            alert(mute_state.muted);
        } catch (error) { }

        follow_state.mute = mute_state.muted;
        this.setState({follow_state})

    }

    render() {
        const { posts, user } = this.state;

        return (
            <div className="container">
                <div className="col-lg-8 offset-lg-2 col-md-10 offset-md-1 col-12 row my-4">
                    {user === null && (
                        <p className="text-center">User profile not found!</p>
                    )}
                    {user === undefined && (
                        <p className="text-center">User profile not found!</p>
                    )}
                    {user && (
                        <div className="row">
                            <div className="w-200">
                                <img src={user.profile_image_link} class="profile-pic round mb-4 border"></img>

                                {this.state.logged_in && !this.state.self_profile && this.state.follow_state && this.state.follow_state.state == "ACCEPTED" && (
                                    <div className="col-10 offset-1">
                                        <div className={`col-12 btn ${this.state.follow_state.mute?'btn-success':'btn-warning'} btnh my-1`} onClick={() => this.mute()}> {this.state.follow_state.mute?'Unmute':'Mute'} </div>
                                        <div className="col-12 btn btn-danger btnh my-1"> Unfollow </div>
                                    </div>
                                )}

                                {this.state.logged_in && !this.state.self_profile && this.state.follow_state && this.state.follow_state.state == "PENDING" && (
                                    
                                    <div className="col-10 offset-1">
                                        <div className="col-12 btn btn-warning btnh my-1 disabled"> Follow request sent </div>
                                    </div>
                                )}

                                {this.state.logged_in && !this.state.self_profile && this.state.follow_state && this.state.follow_state.state == "DNE" && (
                                    <div className="col-10 offset-1">
                                        <div className="col-12 btn btn-primary btnh my-1" onClick={() => this.follow()}> Follow </div>
                                        <div className="col-12 btn btn-danger btnh my-1" onClick={() => this.block()}> Block </div>
                                    </div>
                                    
                                )}

                                {this.state.logged_in && this.state.self_profile && (
                                    <div className="col-10 offset-1">
                                        <Link className="col-12 btn btn-success btnh my-1" to='/post'> Add post </Link>
                                        <div className="col-12 btn btn-primary btnh my-1"> Follow requests </div>
                                        <div className="col-12 btn btn-primary btnh my-1"> Edit profile </div>
                                        <div className="col-12 btn btn-danger btnh my-1" onClick={() => this.logout()}> Logout </div>
                                    </div>
                                )}



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
                    { posts && posts.length == 0 && (
                        <p className="text-center">User profile doesn't have any posts yet.</p>
                    ) }
                </div>

            </div>
        )
    }
}

export default Profile;