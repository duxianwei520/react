import React from 'react'
import {
  Route,
} from 'react-router'
import App from './containers/App'
import Login from './containers/App/login'

import {
  houseCheck,  
  houseManage,
  houseDetail,
  roomDetail,
} from './pages/house'

import popCheck  from './pages/pop/index'


const routes = (
  <Route>
    <Route path="/" component={App}>


      <Route path="/houseCheck" component={houseCheck} />
      <Route path="/houseManage" component={houseManage} />
      <Route path="/houseDetail/:houseId" component={houseDetail} />
      <Route path="/roomDetail/:houseId/:roomId" component={roomDetail} />


      <Route path="/popCheck" component={popCheck} />

    </Route>
    <Route path="/login" component={Login}></Route>
  </Route>
);

export default routes;
