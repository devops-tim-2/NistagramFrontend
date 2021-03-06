import {api, bearer} from '../Environment/environment';
import axios from 'axios';
import jwt from 'jwt-decode';

let userService = {
    get: function(id) {
        let url = `${api}user/api/${id}`;
        return axios.get(url, bearer());
    },
    get_follow: function(id) {
        let url = `${api}user/api/concretefollow/${id}`;
        return axios.get(url, bearer());
    },
    get_follow_requests: function() {
        let url = `${api}user/api/follow`;
        return axios.get(url, bearer());
    },
    follow: function(id) {
        let url = `${api}user/api/follow`;
        return axios.post(url, {dst: id, mute: false}, bearer());
    },
    block: function(id) {
        let url = `${api}user/api/block`;
        return axios.post(url, {dst: id}, bearer());
    },
    mute: function(id) {
        let url = `${api}user/api/follow/mute/${id}`;
        return axios.get(url, bearer());
    },
    login: async function (username, password) {
        let url = `${api}user/api/login`;
        try {
            let access_token = await axios.post(url, {username: username, password: password});
            if (access_token.data && access_token.data.token)  {
                localStorage.setItem('user-token', access_token.data.token);
                localStorage.setItem('identity', JSON.stringify(jwt(access_token.data.token)));
                localStorage.setItem('expires', access_token.data.token.exp);
                this.onChange(1);
                return true;
            }
        } catch(err) {
            return false;
        }
    },
    logout: function () {
        localStorage.removeItem('user-token');
        localStorage.removeItem('identity');
        localStorage.removeItem('expires');
        this.onChange(0);
    },
    register: function (user_object) {
        let url = `${api}user/api/register`;
        return axios.post(url, user_object);
    },
    update: function (user_object) {
        if (!localStorage.getItem('identity')) return;
        let url = `${api}user/api/${JSON.parse(localStorage.getItem('identity')).id}`;
        return axios.put(url, user_object, bearer());
    },
    updateIdentity: async function() {
        if (!localStorage.getItem('identity')) return;
        let identity = JSON.parse(localStorage.getItem('identity'))
        let url = `${api}user/api/${identity.id}`;
        let data = await axios.get(url, bearer());
        localStorage.setItem('identity', JSON.stringify(data.data));
    },
    onChange: function (v) {}
};

export default userService;
