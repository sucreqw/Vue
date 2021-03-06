import axios from 'axios';
import store from './store';
//axios.defaults.baseURL="/cool";

export function get(id, callback) {
    store.commit('setUrl',0);
    axios.get('/shareDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function create(data, callback) {
    store.commit('setUrl',0);
    axios.post('/shareDO/', data)
        .then(function (data) {
            callback(data);
        });
}

export function update(id, data, callback) {
    store.commit('setUrl',0);
    axios.put('/shareDO/' + id, data)
        .then(function (data) {
            callback(data);
        });
}

export function remove(id, callback) {
    store.commit('setUrl',0);
    axios.delete('/shareDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function listPage(page,pageSize,config, callback) {
    store.commit('setUrl',0);
    axios.get('/shareDO/page/'+page+'/'+pageSize,config)
        .then(function (data) {
            callback(data);
        });
}

