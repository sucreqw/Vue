import axios from 'axios'

export function getIPDO (id, callback) {
  axios.get('/hardBlockIpDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function createIPDO (data, callback) {
  axios.post('/hardBlockIpDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function updateIPDO (id, data, callback) {
  axios.put('/hardBlockIpDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function removeIPDO (id, callback) {
  axios.delete('/hardBlockIpDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPageIPDO (page, pageSize, config, callback) {
  axios.get('/hardBlockIpDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
