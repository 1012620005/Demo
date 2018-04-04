import axios from 'axios'
// 创建axios实例
const service = axios.create({
  baseURL: 'http://localhost:8533/static', // api的base_url
  //baseURL: '/api',
  timeout: 20000                  // 请求超时时间
  
})