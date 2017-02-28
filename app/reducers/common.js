import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

// 登陆返回结果
const loginState = () => ({ })
export const loginResponse = handleActions({
  'request login'(state, action) {
    return { ...state, loading: true }
  },
  'receive login'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res, loading: false }
  },
}, loginState())

// 获取用户信息返回结果
const staffResult = () => ({ })
export const staffResponse = handleActions({
  'request staff'(state, action) {
    return { ...state, loading: true }
  },
  'receive staff'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res, loading: false }
  },
}, staffResult())

// 获取用户的权限列表
const navData = () => ({ })
export const navResult = handleActions({
  'request nav'(state, action) {
    return { ...state, loading: true }
  },
  'receive nav'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 3)
      return { ...state, loading: false }
    }
    return { data: res, loading: false }
  },
}, navData())
