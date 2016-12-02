import {
  routerReducer as routing,
} from 'react-router-redux'
import {
  combineReducers,
} from 'redux'

import tabListResult from './tabList'

import {
  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult
} from './house'
import {
 
} from './common'


const rootReducer = combineReducers({
  routing,
  config: (state = {}) => state,
  tabListResult,
 


  houseCheckSearchResult,
  houseCheckSearchQuery,
  houseDetailResult,

  

});

export default rootReducer;
