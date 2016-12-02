import { message } from 'antd'
import * as ajaxFun from './ajax'

export const ajax = ajaxFun
export function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]'
}

export const createAjaxAction = (api, startAction, endAction) => (data, cb) =>
  (dispatch) => {
    let respon
    dispatch(startAction())
    // eslint-disable-next-line no-param-reassign
    data = isArray(data) ? data : [data]
    api(...data)
    .then(checkStatus) // eslint-disable-line no-use-before-define
    .then(response => response.json())
    .then((resp) => {
      respon = resp
      dispatch(endAction({ req: data, res: resp }))
    })
    .then(() => {
      if (respon.status === 1) {
        cb && cb(respon)
      }
    })
    .catch(catchError) // eslint-disable-line no-use-before-define
  }

export const createAjax = (url, param, callback) => {
  let respon;
  ajax.fetchJSONByPost(url)(param)
    .then(checkStatus) // eslint-disable-line no-use-before-define
    .then(response => response.json())
    .then((resp) => {
      respon = resp
    })
    .then(() => {
      if (respon.status === 1) {
        callback && callback(respon.data)
      }
    })
    .catch(catchError) // eslint-disable-line no-use-before-define
}

export const hasResponseError = (data, errorHandler) => {
  if (typeof data !== 'object') {
    try {
      // eslint-disable-next-line no-param-reassign
      data = JSON.parse(`${data}`);
    } catch (e) {
      message.error(`非法的响应数据格式，请联系管理员！[${data}]`,
        MESSAGE_DURATION) // eslint-disable-line no-undef
      return true;
    }
  }
  if (!data.status && errorHandler === undefined) {
    return true;
  }
  if (!data.status && data.httpError && errorHandler !== undefined) {
    return typeof errorHandler === 'function' ? errorHandler(data.httpError) : errorHandler
  }
  return false;
};

export const createApiCustomAjax = (api, startAction, endAction) => (data, apiParam, cb) =>
  (dispatch) => {
    let respon
    dispatch(startAction())
    // eslint-disable-next-line no-param-reassign
    data = isArray(data) ? data : [data]
    api(apiParam)(...data)
      .then(checkStatus) // eslint-disable-line no-use-before-define
      .then(response => response.json())
      .then((resp) => {
        respon = resp
        dispatch(endAction({ req: data, res: resp }))
      })
      .then(() => {
        if (respon.status === 1) {
          cb && cb(respon)
        }
      })
      .catch(catchError) // eslint-disable-line no-use-before-define
  }

export const fakeAjaxAction = (startAction, endAction, callBackAction) => (data, cb) => dispatch => {
  dispatch(startAction())
  dispatch(endAction({ req: {}, res: { data: data } }))
  callBackAction && dispatch(callBackAction())
}

function catchError(error) {
  const { response } = error
  if (!response) {
    console.log(error)
    return
  }
  if (response.status === 401) {
    alert('请重新登录！')
        // 线上环境，刷新页面以重定向到登录页面
    process.env.NODE_ENV === 'production' && location.reload()
  } else if (response.status === 403) {
    alert('你缺少相关权限，部分功能无法使用')
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
// eslint-disable-next-line no-extend-native
Date.prototype.format = function (fmt) { // author: meizz
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    // eslint-disable-next-line no-param-reassign
    fmt = fmt.replace(RegExp.$1,
      (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
  }
  for (const k in o) { // eslint-disable-line no-restricted-syntax
    if (new RegExp(`(${k})`).test(fmt)) {
      // eslint-disable-next-line no-param-reassign
      fmt = fmt.replace(RegExp.$1,
      (RegExp.$1.length === 1) ?
        (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  }
  return fmt;
};


export const getStepDate = (step) => {
  const date = new Date()
  date.setDate(date.getDate() + step)
  return date.format('yyyy-MM-dd')
}

