import axios from 'axios'
import { Message } from 'element-ui'
// import store from '@/store'
import { getToken } from './auth'
import apiUrl from './config'
// 创建axios实例
const service = axios.create({
  baseURL: apiUrl.BASE_URL, // api的base_url
  timeout: 5000                  // 请求超时时间

})

// request拦截器
service.interceptors.request.use(config => {
  // config.data.append('access_token', getToken());
  config.method = 'put';
  config.headers['access_token'] = getToken();
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // console.log(response)
    return response
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
