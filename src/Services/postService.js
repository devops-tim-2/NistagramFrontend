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
    },
    like: function (p_id) {
        let url = `${api}post/api/like/${p_id}`;
        return axios.get(url, bearer());
    },
    dislike: function (p_id) {
        let url = `${api}post/api/dislike/${p_id}`;
        return axios.get(url, bearer());
    },
    favorite: function (p_id) {
        let url = `${api}post/api/favorite/${p_id}`;
        return axios.get(url, bearer());
    },
    inapporpriate: function (p_id) {
        let url = `${api}post/api/inappropriate/${p_id}`;
        return axios.get(url, bearer());
    },
    get_favorites: function() {
        let url = `${api}post/api/favorite`;
        return axios.get(url, bearer());
    }
};

export default postService;
