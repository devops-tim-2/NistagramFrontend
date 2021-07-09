import {api, adminbearer} from '../Environment/environment';
import axios from 'axios';
import jwt from 'jwt-decode';

let adminService = {
    login: async function (username, password) {
        let url = `${api}admin/api/login`;
        try {
            let access_token = await axios.post(url, {username: username, password: password});
            if (access_token.data && access_token.data.token)  {
                localStorage.setItem('admin-user-token', access_token.data.token);
                localStorage.setItem('admin-identity', JSON.stringify(jwt(access_token.data.token)));
                localStorage.setItem('admin-expires', access_token.data.token.exp);
                this.onChange(1);
                return true;
            }
        } catch(err) {
            return false;
        }
    },
    logout: function () {
        localStorage.removeItem('admin-user-token');
        localStorage.removeItem('admin-identity');
        localStorage.removeItem('admin-expires');
        this.onChange(0);
    },
    register: function (un,pw) {
        let url = `${api}admin/api/register`;
        return axios.post(url, {username: un, password: pw});
    },
    getAgentReq: function() {
        let url = `${api}admin/api/requests`;
        return axios.get(url, adminbearer());
    },
    getInappropriate: function() {
        let url = `${api}admin/api/reports`;
        return axios.get(url, adminbearer());
    },
    onChange: function (v) {}
};

export default adminService;
