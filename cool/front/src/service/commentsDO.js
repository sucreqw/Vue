import axios from 'axios';
import store from './store';
//axios.defaults.baseURL="/cool";

export function get(id, callback) {
    store.commit('setUrl',0);
  axios.get('/commentsDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function commentCreate(data, callback) {
    store.commit('setUrl',0);
  axios.post('/commentsDO/', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

export function update(id, data, callback) {
    store.commit('setUrl',0);
  axios.put('/commentsDO/' + id, data)
    .then(function (data) {
      callback(data);
    });
}

export function remove(id, callback) {
    store.commit('setUrl',0);
  axios.delete('/commentsDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function commentListPage(page, pageSize, config, callback) {
    store.commit('setUrl',0);
  axios.get('/commentsDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data);
    });
}

