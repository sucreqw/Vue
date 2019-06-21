import axios from 'axios';


export function get(id, callback) {
  axios.get('/weiboDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function create(data, callback) {
  axios.post('/weiboDO/', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

export function like(id, data, callback) {
  axios.put('/weiboDO/like/' + id, data)
    .then(function (data) {
      callback(data);
    });
}

export function remove(id, callback) {
  axios.delete('/weiboDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function listPage(page, pageSize, config, callback) {
  axios.get('/weiboDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data);
    });
}

