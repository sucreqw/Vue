import axios from 'axios';
import store from './store';
//axios.defaults.baseURL="/cool";

export function get(id, callback) {
    store.commit('setUrl',0);
  axios.get('/weiboDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function create(data, callback) {
    store.commit('setUrl',0);
  axios.post('/weiboDO/', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

export function like(id, data, callback) {
    store.commit('setUrl',0);
  axios.put('/weiboDO/like/' + id, data)
    .then(function (data) {
      callback(data);
    });
}

export function remove(id, callback) {
    store.commit('setUrl',0);
  axios.delete('/weiboDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function listPage(page, pageSize, config, callback) {
    store.commit('setUrl',0);
  axios.get('/weiboDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data);
    });
}

