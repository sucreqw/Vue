import axios from 'axios'

export function get (id, callback) {
  axios.get('/adRoleLinkDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function create (data, callback) {
  axios.post('/adRoleLinkDO/', data)
    .then(function (data) {
      callback(data)
    })
}

export function update (id, data, callback) {
  axios.put('/adRoleLinkDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

export function remove (id, callback) {
  axios.delete('/adRoleLinkDO/' + id)
    .then(function (data) {
      callback(data)
    })
}

export function listPage (page, pageSize, config, callback) {
  axios.get('/adRoleLinkDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
export function getFirstMenu ( callback) {
  axios.get('/adRoleLinkDO/getFirstMenu')
    .then(function (data) {
      callback(data)
    })
}
