import {api, bearer} from '../Environment/environment';
import axios from 'axios';

let postService = {
    create: function (post) {
        let url = `${api}post/api`;
        return axios.post(url, post, bearer());

    },
    get_all: function () {
        let url = `${api}post/api`;
        return axios.get(url, bearer());

    },
    get_users_posts: function (profile_id) {
        let url = `${api}post/api/profile/${profile_id}`;
        return axios.get(url, bearer());
    },
    get_by_id: function (id) {
        let url = `${api}post/api/${id}`;
        return axios.get(url, bearer());

    },
    comment: function (p_id, ct) {
        let url = `${api}post/api/comment/${p_id}`;
        return axios.post(url, {text: ct}, bearer());
    }
};

export default postService;
