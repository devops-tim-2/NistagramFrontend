import {api, bearer} from '../Environment/environment';
import axios from 'axios';

let campaignService = {
    create: function (post) {
        let url = `${api}campaign/api`;
        return axios.post(url, post, bearer());

    },
    get_users_campaigns: function (profile_id) {
        let url = `${api}campaign/api/profile/${profile_id}`;
        return axios.get(url, bearer());
    },
    get_by_id: function (id) {
        let url = `${api}campaign/api/${id}`;
        return axios.get(url, bearer());
    },
    
};

export default campaignService;
