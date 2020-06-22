import axios from 'axios'

export function get (id, callback) {
  axios.get('/hardProjectUserDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/hardProjectUserDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/hardProjectUserDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/hardProjectUserDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/hardProjectUserDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
