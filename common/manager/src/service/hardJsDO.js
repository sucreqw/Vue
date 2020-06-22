import axios from 'axios'

export function getJS (id, callback) {
  axios.get('/hardJsDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function createJS (data, callback) {
  axios.post('/hardJsDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function updateJS (id, data, callback) {
  axios.put('/hardJsDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function removeJS (id, callback) {
  axios.delete('/hardJsDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPageJS (page, pageSize, config, callback) {
  axios.get('/hardJsDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

export function getJSByProjectId (id, callback) {
  axios.get('/hardJsDO/byProjectId/' + id)
    .then(function (data) {
      callback(data)
    })
}
