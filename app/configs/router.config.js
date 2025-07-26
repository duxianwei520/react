import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { isLogin } from '@configs/common'
import { set } from '@config'

import * as base from '@pages/base' // 基础
import * as sysSet from '@pages/set' // 设置中心-系统设置
import * as menu from '@pages/menu' // 菜单

// export default () => (
//   <Router history={hashHistory}>
//     <Route path="/" component={base.app} onEnter={isLogin}>
//       <IndexRoute component={base.example} />
//       <Route path="/desk$/index" component={base.example} />
//       {/* <Route path="/socketReceive" component={base.socketReceive} /> */}
//       {/** *菜单 开始 */}
//       <Route path="/echarts" component={menu.echarts} />
//       <Route path="/editor" component={menu.editor} />
//       {/** *菜单 结束 */}
//       {/** *系统设置 开始 */}
//       <Route path={`/${set}/userManage`} component={sysSet.userManage} />
//       <Route path={`/${set}/roleManage`} component={sysSet.roleManage} />
//       <Route path={`/${set}/moduleManage`} component={sysSet.moduleManage} />
//       {/** *系统设置 结束 */}
//     </Route>
//     <Route path="/login" component={base.login} />
//     <Route path="*" component={base.notfound} />
//   </Router>
// )

const PrivateRoute = ({ component: Component, render, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isLogin(props.location || {})) {
        return render ? render(props) : <Component {...props} />
      }
      return <Redirect to="/login" />
    }
    }
  />)

export default () => (
  <HashRouter>
    <Switch>
      {/* 登录页 */}
      <Route path="/login" component={base.login} />
      {/* 主应用 - 包含侧边栏的所有页面 */}
      <PrivateRoute path="/"
        render={props => (
          <base.app {...props}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/desk$/index" />} />
              <Route path="/desk$/index" component={base.example} />
              <Route path="/echarts" component={menu.echarts} />
              <Route path="/editor" component={menu.editor} />
              <Route path={`/${set}/userManage`} component={sysSet.userManage} />
              <Route path={`/${set}/roleManage`} component={sysSet.roleManage} />
              <Route path={`/${set}/moduleManage`} component={sysSet.moduleManage} />
              <Route path="*" component={base.notfound} />
            </Switch>
          </base.app>
        )}
      />
    </Switch>
  </HashRouter>
);
