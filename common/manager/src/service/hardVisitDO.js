import axios from 'axios'

export function get (id, callback) {
  axios.get('/hardVisitDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/hardVisitDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/hardVisitDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/hardVisitDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/hardVisitDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

export function getChart (config, callback) {
  axios.get('/hardVisitDO/getChart' , config)
    .then(function (data) {
      callback(data)
    })
}
