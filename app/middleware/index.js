
import { routerMiddleware } from 'react-router-redux'
import logger from './logger'
import history from './history'
// import router from './router'

const reduxRouterMiddleware = routerMiddleware(history)

export {
  reduxRouterMiddleware,
  logger,
  // router,
}
