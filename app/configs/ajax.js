
import axios from 'axios'
import { hashHistory } from 'react-router'
import { timeout, baseURL } from '@config'
import { message } from 'antd'
import { parseQueryString } from './common'

const { CancelToken } = axios

// 防止连续出现多个用户登录超时的提示
let flag = true
function logOut(text) {
  if (flag) {
    message.warning(text || '用户登录过期或从其他浏览器登录')
    hashHistory.replace('/login')
    flag = false
    setTimeout(() => flag = true, 0)
  }
}

let baseConfig = {
  // `url` is the server URL that will be used for the request
  url: '/',

  // `method` is the request method to be used when making the request
  method: 'post', // default

  // `baseURL` will be prepended to `url` unless `url` is absolute. It can be
  // convenient to set `baseURL` for an instance of axios to pass relative URLs to
  // methods of that instance.
  baseURL: '',

  // `transformRequest` allows changes to the request data before it is sent to
  // the server This is only applicable for request methods 'PUT', 'POST', and
  // 'PATCH' The last function in the array must return a string or an instance of
  // Buffer, ArrayBuffer, FormData or Stream
  // transformRequest: [
  //   function transformRequest(data) {
  //     // Do whatever you want to transform the data
  //     return data;
  //   },
  // ],

  // `transformResponse` allows changes to the response data to be made before it
  // is passed to then/catch
  // transformResponse: [
  //   function transformResponse(data) {
  //     // Do whatever you want to transform the data
  //     return data;
  //   },
  // ],

  // `headers` are custom headers to be sent
  headers: {
    'Content-Type': 'text/plain',
    // 'X-Requested-With': 'XMLHttpRequest',
  },

  // `params` are the URL parameters to be sent with the request Must be a plain
  // object or a URLSearchParams object
  params: {
    // ID: 12345,
  },

  // `paramsSerializer` is an optional function in charge of serializing `params`
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  // paramsSerializer(params) {   return Qs.stringify(params, { arrayFormat:
  // 'brackets' }); }, `data` is the data to be sent as the request body Only
  // applicable for request methods 'PUT', 'POST', and 'PATCH' When no
  // `transformRequest` is set, must be of one of the following types:
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - Browser only: FormData, File, Blob
  // - Node only: Stream, Buffer
  data: {
    // firstName: 'Fred',
  },

  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: '',

  // `withCredentials` indicates whether or not cross-site Access-Control requests
  // should be made using credentials
  withCredentials: true, // default

  // `adapter` allows custom handling of requests which makes testing easier.
  // Return a promise and supply a valid response (see lib/adapters/README.md).
  // adapter(config) {   /* ... */ }, `auth` indicates that HTTP Basic auth should
  // be used, and supplies credentials. This will set an `Authorization` header,
  // overwriting any existing `Authorization` custom headers you have set using
  // `headers`. auth: {   username: 'janedoe',   password: 's00pers3cret', },
  // `responseType` indicates the type of data that the server will respond with
  // options are 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // // `xsrfCookieName` is the name of the cookie to use as a value for xsrf
  // token xsrfCookieName: 'XSRF-TOKEN', // default // `xsrfHeaderName` is the
  // name of the http header that carries the xsrf token value xsrfHeaderName:
  // 'X-XSRF-TOKEN', // default // `onUploadProgress` allows handling of progress
  // events for uploads onUploadProgress(progressEvent) {   // Do whatever you
  // want with the native progress event }, // `onDownloadProgress` allows
  // handling of progress events for downloads onDownloadProgress(progressEvent) {
  //   // Do whatever you want with the native progress event },
  // `maxContentLength` defines the max size of the http response content allowed
  maxContentLength: 2000,

  // `validateStatus` defines whether to resolve or reject the promise for a given
  // HTTP response status code. If `validateStatus` returns `true` (or is set to
  // `null` or `undefined`), the promise will be resolved; otherwise, the promise
  // will be rejected.
  validateStatus(status) {
    return status >= 200 && status < 300 // default
  },
}

baseConfig = { ...baseConfig, timeout: timeout, baseURL: baseURL }

export const oftenFetchByPost = (api, options) => {
  // 当api参数为createApi创建的返回值
  if (typeof api === 'function') return api
  /**
   * 可用参数组合：
   * (data:Object,sucess:Function,failure:Function,config:Object)
   * (data:Object,sucess:Function,config:Object)
   * (data:Object,sucess:Function)
   * (data:Object,config:Object)
   * (data:Object)
   * ()
   */
  return (...rest) => { // 参数:(data:Object,sucess?:Function,failure?:Function,config?:Object)
    // 参数分析
    const data = rest[0] || {}
    const token = sessionStorage.getItem('token')
    if (token) {
      // data.token = token
    }
    let success = null
    let failure = null
    let config = null
    for (let i = 1; i < rest.length; i += 1) {
      if (typeof rest[i] === 'function') {
        if (!success) {
          success = rest[i]
        } else {
          failure = rest[i]
        }
      }
      if (Object.prototype.toString.call(rest[i]) === '[object Object]') {
        config = rest[i]
      }
    }

    const hooks = {
      abort: null,
    }

    const cancelToken = new CancelToken((c) => { hooks.abort = c })
    // 如果是用的30上的mock的服务，那么就默认不带cookie到服务器
    if (options && (options.baseURL.indexOf('12602') !== -1)) {
      baseConfig.withCredentials = false
    } else {
      baseConfig.withCredentials = true
    }
    axios({
      ...baseConfig, ...options, ...config, url: api, data, cancelToken,
    })
      .then(response => response.data)
      .then((response) => {
        switch (response.status) {
          case 1: { success && success(response); break }
          case 0: {
            // message.warning(response.msg)
            // failure && failure(response)
            if (typeof failure === 'function') {
              failure(response)
            } else {
              // eslint-disable-next-line
              if (response.msg === '系统内部错误!') {
                message.error(response.msg)
              } else {
                message.warning(response.msg)
              }
            }
            break
          }
          case -1: {
            if (typeof failure === 'function') {
              failure(response)
            }
            logOut(response.msg)
            break
          }
          default: {
            if (typeof failure === 'function') {
              failure(response)
            } else {
              logOut()
            }
          }
        }
      })
      .catch((e) => {
        if (axios.isCancel(e)) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('Request canceled', e.message)
          }
        } else {
          console.dir(e)
          if (typeof failure === 'function') {
            if (e.code === 'ECONNABORTED') { // 超时的报错
              failure({
                data: '',
                msg: '服务器连接超时',
                status: 0,
              })
            } else {
              failure({
                data: '',
                msg: e.message,
                status: 0,
              })
            }
          }
        }
      })
    return hooks
  }
}

// 创建发起api的启动器
export const createApi = function (api, options) {
  const obj = parseQueryString(window.location.href)
  let url = api
  if (obj.key) {
    url = `${api}?key=${obj.key}`
    if (obj.sourceName) {
      url = `${api}?key=${obj.key}&sourceName=${obj.sourceName}`
    }
  }
  return oftenFetchByPost(`${url}`, options)
}

