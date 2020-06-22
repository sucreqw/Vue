import axios from 'axios'

export function get (id, callback) {
  axios.get('/hardMessageDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/hardMessageDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/hardMessageDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/hardMessageDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/hardMessageDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
