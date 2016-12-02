import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
// import moment from 'moment'
import { message } from 'antd'

const listResultState = {
  list: [],
  currentPage: 1,
  pageCount: 0,
  pageSize: 20,
  totalCount: 0,
}

export const houseCheckSearchResult = handleActions({
  'request houseCheck list'(state, action) {
    return { ...state, loading: false }
  },
  'receive houseCheck list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 10)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, listResultState)

const queryResultState = () => ({
  keyword: { value: '' },
  division: { value: '' },
  institutions: { value: '' },
  houseStatus: { value: '' },
  addressType: { value: '' },
})

export const houseCheckSearchQuery = handleActions({
  'update houseCheck search query'(state, action) {
    return { ...state, ...action.payload }
  },
  'reset houseCheck search query'(state, action) {
    return { ...queryResultState() }
  },
}, queryResultState())


const detailResultState = {
  allowRole: {},
  shopInfo: {},
}
export const houseDetailResult = handleActions({
  'request house detail'(state, action) {
    return { ...state, loading: false }
  },
  'receive house detail'(state, action) {
    const { res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg)
      return { ...state, loading: false }
    }
    return { ...res.data, loading: false }
  },
}, detailResultState)