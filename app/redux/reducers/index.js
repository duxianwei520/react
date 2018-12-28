import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

import * as tabList from './tabList'
import * as common from './common'

const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  ...tabList,
  ...common,
})

export default rootReducer
