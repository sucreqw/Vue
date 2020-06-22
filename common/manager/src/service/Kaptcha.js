import axios from 'axios';
import { Base64 } from 'js-base64';

/*export function get(callback) {
  axios.get("/Kaptcha/", {
    responseType: "arraybuffer",
  }).then(function (response) {
    //将从后台获取的图片流进行转换
    return 'image/jpeg;base64,' + btoa(
      new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
  }).then(function (data) {
    //接收转换后的Base64图片
    callback(data);
  }).catch(function (err) {
  })
}*/

export function get( callback) {
  axios.get('/Kaptcha/',{responseType:'arraybuffer'})
    .then(function (respone) {
      callback('data:image/jpg;base64,'+ btoa(
        new Uint8Array(respone.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      ))
    });
}
