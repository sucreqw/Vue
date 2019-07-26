import axios from 'axios'

export function get (id, callback) {
  axios.get('/cardDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/cardDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/cardDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/cardDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/cardDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

