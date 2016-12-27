import {
  routerReducer as routing,
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'

import tabListResult from './tabList'

// house
import {
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult
} from './house'
import {
  loginResponse,
} from './common'

const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  tabListResult,

  loginResponse,
  
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,

  
});

export default rootReducer;
