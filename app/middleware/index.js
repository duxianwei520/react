
import { routerMiddleware } from 'connected-react-router'
import logger from './logger'
import history from './history'
// import router from './router'

const reduxRouterMiddleware = routerMiddleware(history)

export {
  reduxRouterMiddleware,
  logger,
  // router,
}
