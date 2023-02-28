import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://153.120.138.130/api/v1',
})

export default instance
