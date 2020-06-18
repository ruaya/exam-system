import axios from 'axios'

import config from '../config'

axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const instence = axios.create({
  baseURL: config.API_URL
})

instence.interceptors.request.use(
  data => {
    return data
  },
  error => {
    return Promise.reject(error)
  }
)

instence.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (!error.response) {
      if (error.message.includes('timeout')) {
        console.log('连接超时')
        alert('连接超时，请重试.')
      } else {
        console.log('发起api请求失败, 是不是断网了?')
      }
    }
    return Promise.reject(error)
  }
)

export default instence