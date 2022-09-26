// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条的样式
import 'nprogress/nprogress.css'
// 引入仓库
import store from '@/store'
const myAxios = axios.create({
  baseURL: '/api',
  timeout: 5000// 响应时间5秒
})
// 请求拦截器
myAxios.interceptors.request.use(config => {
  // config:配置对象，里面有headers请求头
  // 进度条开始
  nprogress.start()
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token值给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
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
