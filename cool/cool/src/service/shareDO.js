import axios from 'axios';


export function get(id, callback) {
    axios.get('/shareDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function create(data, callback) {
    axios.post('/shareDO/', data)
        .then(function (data) {
            callback(data);
        });
}

export function update(id, data, callback) {
    axios.put('/shareDO/' + id, data)
        .then(function (data) {
            callback(data);
        });
}

export function remove(id, callback) {
    axios.delete('/shareDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function listPage(page,pageSize,config, callback) {
    axios.get('/shareDO/page/'+page+'/'+pageSize,config)
        .then(function (data) {
            callback(data);
        });
}

