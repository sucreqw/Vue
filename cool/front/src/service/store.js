import Vue from 'vue'
import Vuex from 'vuex'
import {Base64} from 'js-base64';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
    userInfo: null,
    genInfo: null,
    type:0,//0为cool,1为destiny
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.userInfo = JSON.parse(JSON.parse(Base64.decode(token.split('.')[1])).sysUser);
      } else {
        state.userInfo = null;
      }
    },
    logout(state) {
      state.token = null;
      state.userInfo = null;
    },
    setGen(state, gen) {
      state.genInfo = gen;
    },
    setUrl(state,type){
      state.type=type;
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
    },
    genInfo: state => {
      return state.genInfo;
    },
    baseUrl: state => {
      return state.type;
    }
  }
});
