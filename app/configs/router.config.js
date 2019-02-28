import React from 'react'
import { Router, Route, IndexRoute, hashHistory/* , Redirect */ } from 'react-router'
import { isLogin } from '@configs/common'
import { set } from '@config'

import * as base from '@pages/base' // 基础
import * as sysSet from '@pages/setCenter' // 设置中心-系统设置
// import * as menu from '@pages/menu' // 菜单

// 图表
const echarts = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/menu/echarts').default)
  }, 'echarts')
}

// 测试
const chat = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/menu/chat').default)
  }, 'chat')
}

// 编辑器
const editor = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/menu/editor').default)
  }, 'editor')
}

export default () => (
  <Router history={hashHistory}>
    <Route path="/" component={base.app} onEnter={isLogin}>
      <IndexRoute component={base.welcome} />
      <Route path="/desk$/index" component={base.example} />
      {/** *菜单 开始 */}
      <Route path="/echarts" getComponent={echarts} />
      <Route path="/editor" getComponent={editor} />
      <Route path="/chat" getComponent={chat} />
      {/** *菜单 结束 */}
      {/** *系统设置 开始 */}
      <Route path={`/${set}/userManage`} component={sysSet.userManage} />
      <Route path={`/${set}/roleManage`} component={sysSet.roleManage} />
      <Route path={`/${set}/moduleManage`} component={sysSet.moduleManage} />
      {/** *系统设置 结束 */}
    </Route>
    <Route path="/login" component={base.login} />
    <Route path="*" component={base.notfound} />
  </Router>
)
