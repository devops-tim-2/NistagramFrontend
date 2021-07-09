import {api, bearer} from '../Environment/environment';
import axios from 'axios';

let tagService = {
    get: function (val) {
        let url = `${api}hashtag/api/${val}`;
        return axios.get(url, bearer());
    },
};

export default tagService;
