import axios from 'axios';
import store from './store';

axios.defaults.baseURL="/";
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
    config => {
       config.url = "/api"+config.url;
       config.headers={
           "X-Auth": store.state.token
        };
        return config;
    },
    error => {
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            if(null !=response.data.data){
              return Promise.resolve(response.data.data);
            }else{
              return Promise.resolve(response);
            }

        } else {
            return Promise.reject(response.data);
        }

    },
    error => {
        if(error.response.data.code===503){
            store.commit('logout');
            window.location='/';
        }
        return Promise.reject(error.response.data);
    }
);
