import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://phototag.ddns.net/api/v1',
})

export default instance
