import axios from 'axios';

export function get (id, callback) {
  axios.get('/menuDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/menuDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/menuDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/menuDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/menuDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

export function getMenus(callback) {
  axios.get('/menuDO/getMenu')
    .then(function (data) {
      callback(data);
    });
}
export  function getAllMenu(callback){
  axios.get('/menuDO/getAllMenu')
    .then(function (data) {
      callback(data);
    });
}
