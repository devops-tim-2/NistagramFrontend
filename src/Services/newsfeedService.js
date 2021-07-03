import {api, bearer} from '../Environment/environment';
import axios from 'axios';

let postService = {
    get: function (profile_id) {
        let url = `${api}newsfeed/api`;
        return axios.get(url, bearer());
    },
};

export default postService;
