import axios from 'axios';


export function get(id, callback) {
    axios.get('/dronecommentDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function create(data, callback) {
    axios.post('/dronecommentDO/', data)
        .then(function (data) {
            callback(data);
        });
}

export function update(id, data, callback) {
    axios.put('/dronecommentDO/' + id, data)
        .then(function (data) {
            callback(data);
        });
}

export function remove(id, callback) {
    axios.delete('/dronecommentDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function listPage(page,pageSize,config, callback) {
    axios.get('/dronecommentDO/page/'+page+'/'+pageSize,config)
        .then(function (data) {
            callback(data);
        });
}

