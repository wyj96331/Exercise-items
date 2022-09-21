// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
const myAxios = axios.create({
  baseURL: '/mock',
  timeout: 5000// 响应时间5秒
})
// 请求拦截器
myAxios.interceptors.request.use(config => {
  // config:配置对象，里面有headers请求头
  // 进度条开始
  nprogress.start()
  return config
})
// 响应拦截器
myAxios.interceptors.response.use(response => {
  // 进度条结束
  nprogress.done()
  return response
}, error => {
  return error
})

export default myAxios
