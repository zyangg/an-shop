import axios from 'axios'
import Vue from 'vue'
/* 配置请求根路径 */
axios.defaults.baseURL = 'http://152.136.185.210:8000/api/n3/'
/* 请求拦截器 */
/* 在request显示京都条 */
/* axios.interceptors.request.use(config => {
  NProgress.start()
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
}) */
/* 在response中隐藏进度条 */
/* axios.interceptors.response.use(config => {
  NProgress.done()
  return config
}) */
/* 挂载到vue的原型对象上 */
Vue.prototype.$http = axios
