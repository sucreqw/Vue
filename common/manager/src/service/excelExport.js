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

export function exportMessage(page, pageSize, config, callback) {
  //Vue.$set(config,'responseType','arraybuffer');
  config.responseType='arraybuffer';
  axios.get('/hardMessageDO/page/' + page + '/' + pageSize, config)
  //axios.get('/Kaptcha/',{responseType:'arraybuffer'})
    .then(function (response) {
      const blob = new Blob(
        [response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
      const aEle = document.createElement('a');     // 创建a标签
      const href = window.URL.createObjectURL(blob);       // 创建下载的链接
      aEle.href = href;
      aEle.download = decodeURIComponent(response.headers.filename);  // 下载后文件名
      document.body.appendChild(aEle);
      aEle.click();     // 点击下载
      document.body.removeChild(aEle); // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    });
}

export function exportVisit(page, pageSize, config, callback) {
  //Vue.$set(config,'responseType','arraybuffer');
  config.responseType='arraybuffer';
  axios.get('/hardVisitDO/page/' + page + '/' + pageSize, config)
  //axios.get('/Kaptcha/',{responseType:'arraybuffer'})
    .then(function (response) {
      const blob = new Blob(
        [response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
      const aEle = document.createElement('a');     // 创建a标签
      const href = window.URL.createObjectURL(blob);       // 创建下载的链接
      aEle.href = href;
      aEle.download = decodeURIComponent(response.headers.filename);  // 下载后文件名
      document.body.appendChild(aEle);
      aEle.click();     // 点击下载
      document.body.removeChild(aEle); // 下载完成移除元素
      window.URL.revokeObjectURL(href) // 释放掉blob对象
    });
}
