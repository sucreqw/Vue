import axios from 'axios';
import store from './store';
//axios.defaults.baseURL="/cool";

export function get(callback) {
    store.commit('setUrl',0);
  axios.get('/common/loginurl/' )
    .then(function (data) {
      callback(data);
    });
}



