import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import history from '@middleware/history'

import * as tabList from './tabList'
import * as common from './common'

const rootReducer = combineReducers({
  router: connectRouter(history),
  config: (state = {}) => state,
  ...tabList,
  ...common,
})

export default rootReducer
