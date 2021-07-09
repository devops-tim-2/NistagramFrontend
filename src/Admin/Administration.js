import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../Post/Post';
import adminService from '../Services/adminService';


class Administration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agentReq: null
    };
  }

  async componentDidMount() {
    let agentReq = (await adminService.getAgentReq()).data;
    let inapp = (await adminService.getInappropriate()).data;
    this.setState({ agentReq, inapp })
  }

  render() {
    const { x } = this.state;
    return (
      <div className="col-8 offset-2">
        <div className="col-12 my-5">
          <h3>Agent requests</h3>
          {this.state.agentReq && this.state.agentReq.length > 0 && this.state.agentReq.map(e => (
            <div className="col-12 px-4 py-3 d-flex justify-content-between">
              <div>
                <img className="round wh-30 mx-2" src={e.profile_image_link}></img>
                <Link className="mx-2 nounderline bold" to={`/profile/${e.agent_id}`}>{e.username}</Link>
              </div>
              <div>
                <div className="btn btn-danger">Reject</div>
                <div className="btn btn-success">Approve</div>
              </div>
            </div>
          ))}
          <hr></hr>
        </div>
        <div className="col-12 my-5 row">
          <h3>Inappropriate reports</h3>
          {this.state.inapp && this.state.inapp.length > 0 && this.state.inapp.map(e => (
            <div class="col-4 p-3">
              <Post post_id={e.post_id}></Post>
              <div class="px-5">
                <span className="btn btn-danger w-50">Ban user</span>
                <span className="btn btn-warning w-50">Remove post</span>
              </div>
            </div>
          ))}
          <hr></hr>
        </div>
      </div>
    )
  }
}

export default Administration;