import axios from "axios";

export function listProjectType (page, pageSize, config, callback) {
  axios.get('/hardProjectTypeDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}

export function listAllProject (page, pageSize, config, callback) {
  axios.get('/hardProjectDO/allpage/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
//当前用户下的授权项目
export function listProjectUser (id,callback) {
  axios.get('/hardProjectUserDO/permitProject/'+id )
    .then(function (data) {
      callback(data)
    })
}
//新增用户时授权项目
export function addProjectUser (data, callback) {
  axios.post('/hardProjectUserDO/', data)
    .then(function (data) {
      callback(data)
    })
}
//修改用户授权项目
export function updateProjectUser (id, data, callback) {
  axios.put('/hardProjectUserDO/' + id, data)
    .then(function (data) {
      callback(data)
    })
}

//列出所有用户，给硬广页面 分配留言板 用
export function listAllUser (page, pageSize, config, callback) {
  axios.get('/userDO/page/' + page + '/' + pageSize, config)
    .then(function (data) {
      callback(data)
    })
}
