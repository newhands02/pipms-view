import axios from 'axios'
import router from '@/router/index'
const http = axios.create(
  {
    timeout: 1000 * 86400,
    withCredentials: true,
    baseURL: '/api/',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    }
  });
// 请求拦截
// http.interceptors.request.use(config => {
// config.headers['Token'] = storage.get('Token') // 请求头带上token
// return config
// }, error => {
// return Promise.reject(error)
// })
// 响应拦截
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    alert('认证失败');
    router.push({path:'/login' });
  }else if(response.data && response.data.code === 403){
    alert('您没有访问权限');
  }
  return response
}, error => {
  return Promise.reject(error)
})
export default http;
