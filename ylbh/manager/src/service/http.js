import axios from 'axios';
import store from './store';

axios.defaults.baseURL="/";
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
    config => {
       config.url = "/api"+config.url;
       config.headers={
           "X-Auth":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzeXNVc2VyIjoie1wiY3JlYXRlZEF0XCI6MTU0MjI2ODM4MSxcImlkXCI6MSxcImlzQWRtaW5cIjowLFwiaXNTdGF0ZVwiOjEsXCJsb2dpbmVkQXRcIjoxNTg1MjA4NDQzLFwicm5hbWVcIjpcIui2hee6p-euoeeQhuWRmFwiLFwic2VjcmV0UGFzc1wiOlwiYWRtaW5cIixcInRoZUxpbmtcIjpcIltcXFwiMTg2XFxcIixcXFwiMTk5XFxcIl1cIixcInRoZU1lbnVcIjpcIjRcIixcInRva2VuXCI6XCIzOWU2NzUwNmE5MWQ1YjkxNGQxNGNiYWU2OTk1NWM5ZVwiLFwidW5hbWVcIjpcInJvb3RcIixcInVwYXNzXCI6XCJhMTIzNDU2N1wiLFwidXBkYXRlZEF0XCI6MTU4NDA4Mzg1Nn0ifQ.lHwbFTCeRPE9DQbiRNaYLFFQ8BK-sOUwM4UeNDwvCFc"//store.state.token
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
