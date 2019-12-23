import axios from 'axios'

export function get (callback) {
  axios.get('/cardGatherDO/' )
    .then(function (data) {
      callback(data)
    })
}
