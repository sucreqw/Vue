import axios from 'axios';
import store from './store';

//axios.defaults.baseURL="/destiny";

export function getEightWord(isChinese,isLeap,data, callback) {
    store.commit('setUrl',1);
  axios.post('/Destiny/?isChinese='+ isChinese +"&isLeap="+isLeap, data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

export function tenGod(data, callback) {
    store.commit('setUrl',1);
  axios.post('/TenGod/', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

export function yearFate(isChinese,isLeap,data, callback) {
    store.commit('setUrl',1);
  axios.post('/YearFate/?isChinese='+ isChinese +"&isLeap="+isLeap, data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}
export function deity(isChinese,isLeap,data, callback) {
    store.commit('setUrl',1);
  axios.post('/Deity/?isChinese='+ isChinese +"&isLeap="+isLeap, data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

