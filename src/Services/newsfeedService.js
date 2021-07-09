import {api, bearer} from '../Environment/environment';
import axios from 'axios';

let newsfeedService = {
    get: function (page) {
        let url = `${api}newsfeed/api?page=${page}`;
        return axios.get(url, bearer());
    },
    get_campaigns: function (page) {
        let url = `${api}newsfeed/api/campaigns?page=${page}`;
        return axios.get(url, bearer());
    },
};

export default newsfeedService;
