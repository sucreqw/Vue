import axios from 'axios';


export function get(callback) {
  axios.get('/backup/' )
    .then(function (data) {
      callback(data);
    });
}
export function update( data, callback) {
  axios.post('/backup/change', data)
    .then(function (data) {
      callback(data);
    });
}
export function remove(data, callback) {
  axios.post('/backup/delete',data)
    .then(function (data) {
      callback(data);
    });
}

