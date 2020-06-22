import axios from 'axios';


export function login(data, callback) {
  axios.post('/userDO/login', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}
