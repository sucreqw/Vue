import axios from 'axios';


export function get(id, callback) {
    axios.get('/thirdPlatformDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function create(data, callback) {
    axios.post('/thirdPlatformDO/', data)
        .then(function (data) {
            callback(data);
        });
}

export function update(id, data, callback) {
    axios.put('/thirdPlatformDO/' + id, data)
        .then(function (data) {
            callback(data);
        });
}

export function remove(id, callback) {
    axios.delete('/thirdPlatformDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function listPage(page,pageSize,config, callback) {
    axios.get('/thirdPlatformDO/page/'+page+'/'+pageSize,config)
        .then(function (data) {
            callback(data);
        });
}

