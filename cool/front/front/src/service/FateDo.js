import axios from 'axios';


//axios.defaults.baseURL="/fate";

export function getEightWord(isChinese,isLeap,data, callback) {
  axios.post('/Destiny/?isChinese='+ isChinese +"&isLeap="+isLeap, data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

export function tenGod(data, callback) {
  axios.post('/TenGod/', data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

export function yearFate(isChinese,isLeap,data, callback) {
  axios.post('/YearFate/?isChinese='+ isChinese +"&isLeap="+isLeap, data)
    .then(function (data) {
      callback(data);
    })
    .catch(function (error) {
      callback(data, error);
    });
}

