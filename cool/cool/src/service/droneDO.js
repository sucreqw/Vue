import axios from 'axios';


export function get(id, callback) {
    axios.get('/droneDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function create(data, callback) {
    axios.post('/droneDO/', data)
        .then(function (data) {
            callback(data);
        });
}

export function update(id, data, callback) {
    axios.put('/droneDO/' + id, data)
        .then(function (data) {
            callback(data);
        });
}

export function remove(id, callback) {
    axios.delete('/droneDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function listPage(page,pageSize,config, callback) {
    axios.get('/droneDO/page/'+page+'/'+pageSize,config)
        .then(function (data) {
            callback(data);
        });
}

