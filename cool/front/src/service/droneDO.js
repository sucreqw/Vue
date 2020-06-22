import axios from 'axios';
import store from './store';
//axios.defaults.baseURL="/cool";

export function get(id, callback) {
    store.commit('setUrl',0);
    axios.get('/droneDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function create(data, callback) {
    store.commit('setUrl',0);
    axios.post('/droneDO/', data)
        .then(function (data) {
            callback(data);
        });
}

export function update(id, data, callback) {
    store.commit('setUrl',0);
    axios.put('/droneDO/' + id, data)
        .then(function (data) {
            callback(data);
        });
}

export function remove(id, callback) {
    store.commit('setUrl',0);
    axios.delete('/droneDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function listPage(page,pageSize,config, callback) {
    store.commit('setUrl',0);
    axios.get('/droneDO/page/'+page+'/'+pageSize,config)
        .then(function (data) {
            callback(data);
        });
}

export function like(id, data, callback) {
    store.commit('setUrl',0);
  axios.put('/droneDO/like/' + id, data)
    .then(function (data) {
      callback(data);
    });
}
