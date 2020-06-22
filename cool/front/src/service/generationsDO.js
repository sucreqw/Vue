import axios from 'axios';
import store from './store';
//axios.defaults.baseURL="/cool";
store.commit('setUrl',0);
export function get(id, callback) {
    store.commit('setUrl',0);
  axios.get('/generationsDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function getAllFather(id, callback) {
    store.commit('setUrl',0);
  axios.get('/generationsDO/allFather/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function create(data, callback) {
    store.commit('setUrl',0);
  axios.post('/generationsDO/', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

export function update(id, data, callback) {
    store.commit('setUrl',0);
  axios.put('/generationsDO/' + id, data)
    .then(function (data) {
      callback(data);
    });
}

export function remove(id, callback) {
    store.commit('setUrl',0);
  axios.delete('/generationsDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function listPage(page, pageSize, config, callback) {
    store.commit('setUrl',0);
  axios.get('/generationsDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data);
    });
}

