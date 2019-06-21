import axios from 'axios';


export function get(callback) {
  axios.get('/common/loginurl/' )
    .then(function (data) {
      callback(data);
    });
}



