import axios from 'axios'

export function get (id, callback) {
  axios.get('/payRecordDo/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/payRecordDo/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/payRecordDo/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/payRecordDo/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPagePay (page, pageSize, config, callback) {
  axios.get('/payRecordDo/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

