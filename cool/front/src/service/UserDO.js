import axios from 'axios';
import store from './store';
//axios.defaults.baseURL="/cool";

export function get(id, callback) {
    store.commit('setUrl',0);
    axios.get('/userDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function create(data, callback) {
    store.commit('setUrl',0);
    axios.post('/userDO/', data)
        .then(function (data) {
            callback(data);
        });
}

export function update(id, data, callback) {
    store.commit('setUrl',0);
    axios.put('/userDO/' + id, data)
        .then(function (data) {
            callback(data);
        });
}

export function remove(id, callback) {
    store.commit('setUrl',0);
    axios.delete('/userDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function listPage(page,pageSize,config, callback) {
    store.commit('setUrl',0);
    axios.get('/userDO/page/'+page+'/'+pageSize,config)
        .then(function (data) {
            callback(data);
        });
}

export function login(data, callback) {
    store.commit('setUrl',0);
  axios.post('/userDO/login', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}
export function callBack(data, callback) {
    store.commit('setUrl',0);
  axios.get('/userDO/callback/'+ data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}
