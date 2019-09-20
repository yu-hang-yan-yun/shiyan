import axios from 'axios'
import qs from 'qs'
// import router from '../router'
import { Message, Loading } from 'element-ui'
const service = axios.create({
  baseURL: 'http://192.168.1.100:8080/', // api 的 base_url
  timeout: 10000, // 请求超时时间
  post: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }, // end post
  transformRequest: [data => qs.stringify(data)]
})
// json字符串的axios方法
const fetchInstance = axios.create({
  baseURL: 'http://192.168.1.100:8080/', // api 的 base_url
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  } // end post
})
// service.defaults.baseURL = 'http://192.168.1.100:8080/'
// service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// service.defaults.withCredentials = true
let loadingInstance

RequestInterceptors(service) // 监听servers 对象的请求拦截
RequestInterceptors(fetchInstance) // 监听fetchInstance 对象的请求拦截
function RequestInterceptors (axiosServers) {
  axiosServers.interceptors.request.use(
    function (config) {
      loadingInstance = Loading.service({
        lock: true,
        text: '努力拉取中 ~>_<~',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 在发送请求之前做些什么?获取token,传递
      // 1.获取token
      var token = localStorage.getItem('jc_token')
      if (token) {
        // 2.在发送请求的时候传递token
        config.headers['Token'] = token
      }
      // console.log(222222)
      console.log(config)
      // console.log(store)
      // console.log(store.getters.ipHost)
      var ipHost = localStorage.getItem('setIpHost')
      config.url = ipHost + config.url
      // console.log(1111111)
      // console.log(config)
      // loadingInstance.close()
      return config
    }
  )
}
responsefetchInstance(service) // 监听servers 对象的请求拦截
responsefetchInstance(fetchInstance) // 监听fetchInstance 对象的请求拦截
function responsefetchInstance (autofetchInstance) {
  // 响应拦截器即异常处理并关闭加载动画
  autofetchInstance.interceptors.response.use(response => {
    loadingInstance.close()
    // console.log('response:' + response)
    console.log(response.data, 22222222)
    // if (response.data.flag === 0) {
    //   Message.error(response.data.msg)
    //   router.push({
    //     path: '/login'
    //   })
    // }
    return response
  }, err => {
    loadingInstance.close()

    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '错误请求'
          break
        case 401:
          err.message = '未授权，请重新登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = '请求错误,未找到该资源'
          break
        case 405:
          err.message = '请求方法未允许'
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器端出错'
          break
        case 501:
          err.message = '网络未实现'
          break
        case 502:
          err.message = '网络错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网络超时'
          break
        case 505:
          err.message = 'http版本不支持该请求'
          break
        default:
          err.message = `连接错误${err.response.status}`
      }
    } else {
      err.message = '连接到服务器失败'
    }
    Message.error(err.message)
  })
}
// axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))
export const get = (url, params) =>
  params == null || params instanceof Object
    ? service.get(url, { params })
    // eslint-disable-next-line prefer-promise-reject-errors
    : Promise.reject('params must be an object')
export const post = (url, params) =>
  params == null || params instanceof Object
    ? service.post(url, { ...params })
    // eslint-disable-next-line prefer-promise-reject-errors
    : Promise.reject('params must be an object')
export const deleted = (url, params) =>
  params == null || params instanceof Object
    ? service.delete(url, { params: params })
    // eslint-disable-next-line prefer-promise-reject-errors
    : Promise.reject('params must be an object')
export const put = (url, params) =>
  params == null || params instanceof Object
    ? service.put(url, { ...params })
    // eslint-disable-next-line prefer-promise-reject-errors
    : Promise.reject('params must be an object')

export const postJson = (url, params) => {
  // eslint-disable-next-line prefer-promise-reject-errors
  return params == null || params instanceof Object ? fetchInstance.post(url, params) : Promise.reject('params must be an object')
} // end postWithJson
export const putJson = (url, params) => {
  // eslint-disable-next-line prefer-promise-reject-errors
  return params == null || params instanceof Object ? fetchInstance.put(url, { ...params }) : Promise.reject('params must be an object')
}
