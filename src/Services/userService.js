import {api, bearer} from '../Environment/environment';
import axios from 'axios';
import jwt from 'jwt-decode';

let userService = {
    // register: async function (username, password, first_name, last_name, user_role) {
    //     let url = `${api}user/register`;
    //     try {
    //         let res = await axios.post(url, {username: username, password: password, role: user_role, first_name: first_name, last_name: last_name});
    //         return true;
    //     } catch (error) {
    //         return false;
    //     }
    // },
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
    onChange: function (v) {}
};

export default userService;
