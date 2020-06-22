import axios from 'axios'

export function getAddr (id, callback) {
  axios.get('/hardBlockAddrDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function createAddr (data, callback) {
  axios.post('/hardBlockAddrDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function updateAddr (id, data, callback) {
  axios.put('/hardBlockAddrDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function removeAddr (id, callback) {
  axios.delete('/hardBlockAddrDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPageAddr (page, pageSize, config, callback) {
  axios.get('/hardBlockAddrDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
