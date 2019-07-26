import axios from 'axios'

export function get (id, callback) {
  axios.get('/payRecordDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/payRecordDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/payRecordDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/payRecordDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/payRecordDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

