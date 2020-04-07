import axios from 'axios';


export function getMenus(callback) {
  axios.get('/adRoleLinkDO/getMenu')
    .then(function (data) {
      callback(data);
    });
}
export  function getAllMenu(callback){
  axios.get('/adRoleLinkDO/getAllMenu')
    .then(function (data) {
      callback(data);
    });
}
