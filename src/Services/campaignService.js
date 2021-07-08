import {api, bearer} from '../Environment/environment';
import axios from 'axios';

let campaignService = {
    create: function (post) {
        let url = `${api}campaign/api`;
        return axios.post(url, post, bearer());

    }
    
};

export default campaignService;
