import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

class CampaignThumbnail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            campaign: null,
        };
    }

    async componentDidMount() {
        this.setState({
            campaign: this.props.campaign
        });
    }



    render() {
        const { campaign } = this.state;
        if (!campaign) return <p>Loading campaign ...</p>;
        return (
            <Link to={`/campaign/${campaign.id}`} className="col-lg-4 col-md-4 col-6 m-0 p-0 thumbnail cursor-pointer">
                <img className="post-image-thumbnail" src={campaign.image_url}></img>
            </Link>
        )
    }
}

export default CampaignThumbnail;