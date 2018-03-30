import axios from 'axios'
import router from '../routers/routers'
import { Message } from 'element-ui'
import { getToken } from './auth'
import apiUrl from './config'
// 创建axios实例
const service = axios.create({
 baseURL: apiUrl.BASE_URL, // api的base_url
 timeout: 20000                  // 请求超时时间

})

// request拦截器
service.interceptors.request.use(config => {
  config.method = 'post'
    config.headers['access_token'] = getToken() 
  // }
  return config
}, error => {
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response =>{
    const res = response.data;
    console.log(res)
    if(res.meta.code !== '200'){
      if(res.meta.code == '500'){
        var msg = res.meta.message 
        Message({
          message: "请重新操作",
          type: 'error',
          duration: 800
        })
      };
      if(res.meta.code == '401'){
        Message({
          message: "请重新登录",
          type: 'error',
          duration: 800
        })
        router.push('/')
      }else{
        Message({
          message: "请重新操作",
          type: 'error',
          duration: 800
        })
      }
    }else{
      return response
    }
  },
 
  error => {
    console.log('err' + error.message)// for debug
    Message({
      message: "请重新操作",
      type: 'error',
      duration: 800
    })
    return Promise.reject(error)
  }
)

export default service
