import { handleActions } from 'redux-actions'
import { hasResponseError } from 'utils'
import { message } from 'antd'

const amListState = () => ({ list: [] })

export const amList = handleActions({
  'request am list'(state, action) {
    return { ...state, loading: true }
  },
  'receive am list'(state, action) {
    // eslint-disable-next-line no-unused-vars
    const { req, res } = action.payload
    if (hasResponseError(res)) {
      message.error(res.msg, 10)
      return { ...state, loading: false }
    }
    return { list: res.data, loading: false }
  },
  'reset am list'(state, action) {
    return { ...amListState() }
  },
}, amListState())

