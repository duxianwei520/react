import { handleActions } from 'redux-actions'

// 登陆返回结果
const loginState = () => ({})
export const loginResponse = handleActions({
  'request login'(state, action) {
    return { ...state, loading: true }
  },
  'receive login'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    return { data: res, loading: false }
  },
}, loginState())


// gForm2.0缓存
const cache2 = () => ({})
export const gFormCache2 = handleActions({
  'set gform cache2'(state, action) {
    const { cacheKey, cacheContent } = action.payload
    if (cacheKey === undefined) {
      throw new Error('cacheKey不能是undefined')
    }
    if (cacheContent === undefined) {
      throw new Error('cacheContent不能是undefined')
    }
    state[cacheKey] = { ...state[cacheKey], ...cacheContent }
    return { ...state }
  },
  'clear gform cache2'(state, action) {
    return cache2()
  },
}, cache2())


// gForm2.0头部搜索类别
const allRetrievalState = {
  list: [],
}
export const allRetrievalResult = handleActions({
  'request all retrieval'(state, action) {
    return { ...state, loading: true }
  },
  'receive all retrieval'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    return { ...res.data, loading: false }
  },
}, allRetrievalState)


// socket相关操作
/* export const socketCollection = handleActions({
  'socketReceive'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const data = action.payload
    return { data }
  },
}, {}) */
