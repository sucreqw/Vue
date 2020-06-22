import axios from 'axios'

export function get (id, callback) {
  axios.get('/hardProjectTypeDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/hardProjectTypeDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/hardProjectTypeDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/hardProjectTypeDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/hardProjectTypeDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
