import axios from 'axios'

export function getPageFile (id, callback) {
  axios.get('/hardPageFilesDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function createPageFile (data, callback) {
  axios.post('/hardPageFilesDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function updatePageFile (id, data, callback) {
  axios.put('/hardPageFilesDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function removePageFile (id, callback) {
  axios.delete('/hardPageFilesDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPagePageFile (page, pageSize, config, callback) {
  axios.get('/hardPageFilesDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
