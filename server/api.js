import axios from 'axios'

// 创建axios实例
const api = axios.create({
  baseURL: '', // 后台 api 的 url
  timeout: 30000,     // 请求超时时间
  validateStatus: function (status) {
    return status < 500 // Reject only if the status code is greater than or equal to 500
  }
})

// request拦截器
api.interceptors.request.use(config => {
  return config
}, error => {
  // Do something with request error
  console.log('request err:', error) // for debug
  return Promise.reject(error)
})

// respone拦截器
api.interceptors.response.use(res => {
  if (res.data.status_code === 401) {
  }
  if (res.data.status_code === 200 && res.data) {
    res.data.ok = true
  }
  if (res.data.status_code === 400) { // 后端报错
  }
  return res
}, (error, data) => {
  if (error.request && error.request.readyState === 4) {
    error.response = {
      'status_code': 500,
      'message': '请检查网络，稍后重试！'
    }
  } else {
    alert('网络错误，请稍后重试！')
  }
  console.log('response err:', error)// for debug
  return Promise.reject(error.response)
})

export default api
