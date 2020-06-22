import axios from 'axios'

export function get (id, callback) {
  axios.get('/hardKeywordDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/hardKeywordDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/hardKeywordDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/hardKeywordDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/hardKeywordDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
