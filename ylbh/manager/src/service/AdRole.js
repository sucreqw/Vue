import axios from 'axios'

export function get (id, callback) {
  axios.get('/adRoleDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/adRoleDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/adRoleDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/adRoleDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/adRoleDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

