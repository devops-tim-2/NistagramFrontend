import React, {Component, useState }  from 'react';
import {Link} from 'react-router-dom';
import { dummy_posts } from '../Environment/environment';
import Campaign from './Campaign';


class CampaignPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campaign_id: null,
    };
  }

  async componentDidMount() {
    const { match: { params } } = this.props;
    let campaign_id = params.campaign_id
    this.setState({campaign_id})
  }

  render() {
    const { campaign_id } = this.state;
    if (!campaign_id) return <p>Loading campaign ...</p>;
    return (
        <div className="col-8 offset-2 my-5">
            <Campaign campaign_id={this.state.campaign_id}></Campaign>
        </div>
    )
  }
}

export default CampaignPage;