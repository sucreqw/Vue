import axios from 'axios';


export function get(id, callback) {
    axios.get('/generationsDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function create(data, callback) {
    axios.post('/generationsDO/', data)
        .then(function (data) {
            callback(data);
        });
}

export function update(id, data, callback) {
    axios.put('/generationsDO/' + id, data)
        .then(function (data) {
            callback(data);
        });
}

export function remove(id, callback) {
    axios.delete('/generationsDO/' + id)
        .then(function (data) {
            callback(data);
        });
}

export function listPage(page,pageSize,config, callback) {
    axios.get('/generationsDO/page/'+page+'/'+pageSize,config)
        .then(function (data) {
            callback(data);
        });
}

