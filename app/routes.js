import React from 'react'
import {
  Route,
  IndexRoute
} from 'react-router'
import App from './containers/App'
import Welcome from './pages/welcome'
// import Login from './containers/App/login'

// import {
//   houseCheck,
//   houseManage,
//   houseDetail,
//   roomDetail,
// } from './pages/house'

// import popCheck from './pages/pop/index'

const houseManage = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/house/houseManage').default)
  }, 'houseManage')
}


const Login = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./containers/App/login').default)
  }, 'login')
}


const test = (location, cb) => {
  require.ensure([], require => {
    cb(null, require('./pages/test').default)
  }, 'test')
}

/* 进入路由的判断*/
function isLogin(nextState, replaceState) {
  const token = sessionStorage.getItem('token')
  if (!token) {
    replaceState('/login')
    // hashHistory.push('/login')
  }
}

const routes = (
  <Route>
    <Route path="/" component={App} onEnter={isLogin}>
      <IndexRoute component={Welcome} />
      <Route path="/houseManage" getComponent={houseManage} />

      <Route path="/test" getComponent={test} query={{'name': 'dupi'}} />

    </Route>
    <Route path="/login" getComponent={Login}></Route>
  </Route>
);

export default routes
