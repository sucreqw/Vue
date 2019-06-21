import axios from 'axios';


export function get(id, callback) {
  axios.get('/commentsDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function commentCreate(data, callback) {
  axios.post('/commentsDO/', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

export function update(id, data, callback) {
  axios.put('/commentsDO/' + id, data)
    .then(function (data) {
      callback(data);
    });
}

export function remove(id, callback) {
  axios.delete('/commentsDO/' + id)
    .then(function (data) {
      callback(data);
    });
}

export function commentListPage(page, pageSize, config, callback) {
  axios.get('/commentsDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data);
    });
}

