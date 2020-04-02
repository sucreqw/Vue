import axios from 'axios';


export function login(data, callback) {
  axios.post('/adLoginDO/login', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}
