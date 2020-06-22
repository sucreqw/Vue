import axios from 'axios'

export function get (id, callback) {
  axios.get('/userDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/userDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/userDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/userDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/userDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

export function listRole (page, pageSize, config, callback) {
  axios.get('/roleDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

export function ChangePass(data, callback) {
  axios.post('/userDO/ChangePass', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}
