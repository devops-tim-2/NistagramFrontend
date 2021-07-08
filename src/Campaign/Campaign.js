import React, {Component, useState }  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import campaignService from '../Services/campaignService'
import userService from '../Services/userService'
import { Button, FormGroup, FormControl } from "react-bootstrap";


class Campaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campaign: null,
    };
  }

  async refresh_data() {
    let response = await campaignService.get_by_id(this.props.campaign_id);
    let owner = (await userService.get(response.data.user_id)).data;
    response.data.owner = {username: owner.username, profile_image_link: owner.profile_image_link};
        
    let campaign = response.data
    this.setState({
        campaign
    });
  }

  async componentDidMount() {
    this.refresh_data();
  }


  render() {
    const { campaign } = this.state;
    if (!campaign) return <p>Loading campaign...</p>;
    return (
        <div className="col-12 border border-light">
            <div className="col-12 px-4 py-3">
                <img className="round wh-30 mx-2" src={campaign.owner.profile_image_link}></img>
                <Link className="mx-2 nounderline bold" to={`/profile/${campaign.user_id}`}>{campaign.owner.username}</Link>
            </div>
            <div className="col-12">
                <img className="post-image" src={campaign.image_url}></img>
            </div>
            <a className="nounderline" href={`https://nistagram-tim2-staging.herokuapp.com/shop?id=${campaign.user_id}`}>
            <div className="col-12 bg-primary xx p-3 text-white h5 nounderline">
              Visit {campaign.owner.username}'s webshop
            </div>
            </a>
        </div>
    )
  }
}

export default Campaign;