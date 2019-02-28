import React from 'react'
import { Router, Route, IndexRoute, hashHistory/* , Redirect */ } from 'react-router'
import { isLogin } from '@configs/common'
import { set } from '@config'

// import * as base from '@pages/base' // 基础
// import * as sysSet from '@pages/setCenter' // 设置中心-系统设置
// import * as menu from '@pages/menu' // 菜单
// 图表
const wrap = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/base/app').default)
  }, 'wrap')
}

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

// 示例页面
const example = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/base/example').default)
  }, 'example')
}

// 用户管理
const login = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/base/login').default)
  }, 'login')
}

// welcome
const welcome = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/base/welcome').default)
  }, 'welcome')
}

// 用户管理
const userManage = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/setCenter/sys/userManage').default)
  }, 'userManage')
}

// 角色管理
const roleManage = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/setCenter/sys/roleManage').default)
  }, 'roleManage')
}

// 模块管理
const moduleManage = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/setCenter/sys/moduleManage').default)
  }, 'moduleManage')
}

// 404
const notfound = (location, cb) => {
  require.ensure([], (require) => {
    cb(null, require('../pages/base/notfound').default)
  }, 'notfound')
}

export default () => (
  <Router history={hashHistory}>
    <Route path="/" getComponent={wrap} onEnter={isLogin}>
      <IndexRoute getComponent={welcome} />
      <Route path="/desk$/index" getComponent={example} />
      {/** *菜单 开始 */}
      <Route path="/echarts" getComponent={echarts} />
      <Route path="/editor" getComponent={editor} />
      <Route path="/chat" getComponent={chat} />
      {/** *菜单 结束 */}
      {/** *系统设置 开始 */}
      <Route path={`/${set}/userManage`} getComponent={userManage} />
      <Route path={`/${set}/roleManage`} getComponent={roleManage} />
      <Route path={`/${set}/moduleManage`} getComponent={moduleManage} />
      {/** *系统设置 结束 */}
    </Route>
    <Route path="/login" getComponent={login} />
    <Route path="*" getComponent={notfound} />
  </Router>
)
