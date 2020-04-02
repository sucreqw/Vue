import Vue from 'vue'
import Vuex from 'vuex'
import { Base64 } from 'js-base64';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        userInfo:null
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            if(token){
                state.userInfo = JSON.parse(JSON.parse(Base64.decode(token.token.split('.')[1])).sysUser);
            }else{
                state.userInfo = null;
            }
        },
        logout(state){
            state.token =null;
            state.userInfo = null;
        }
    },
    getters: {
        token: state => {
            return state.token;
        },
        userInfo: state => {
            return state.userInfo;
        },
        userId: state => {
            return state.userInfo.id;
        }
    }
});
