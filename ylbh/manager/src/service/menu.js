import axios from 'axios';


export function get(callback) {
  axios.get('/adRoleLinkDO/getMenu')
    .then(function (data) {
      callback(data);
    });
}
