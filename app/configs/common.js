
import { hashHistory } from 'react-router'
import { message } from 'antd'
import { loginByTicket, staff, login as loginApi, getBtns } from '@apis/common'

export function parseQueryString(url) {
  const obj = {}
  if (url.indexOf('?') !== -1) {
    const str = url.split('?')[1]
    const strs = str.split('&')
    strs.map((item, i) => {
      const arr = strs[i].split('=')
      /* eslint-disable */
      obj[arr[0]] = arr[1]
    })
  }
  return obj
}

/* --------------验证ticket并获取用户信息和菜单信息 --------------*/
const _fetchLoginByTicket = async ticket => new Promise((resolve) => {
  loginByTicket({ ticket }, (response) => {
    resolve(response.data)
  }, (response) => {
    const obj = parseQueryString(window.location.href)
    console.log(obj)
    if (obj.ticket || obj.mode) {
      message.info('登录过期或服务不可用')
    } else {
      hashHistory.replace('/login')
    }
  })
})

const _fetchStaff = () => new Promise((resolve) => {
  staff({}, (res) => {
    const { data } = res
    sessionStorage.setItem('userinfo', JSON.stringify(data))
    resolve()
  })
})

/* eslint-disable no-use-before-define */
export const isHasCurrentMenu = (allMenu, pathname) => compare(allMenu, pathname)
/* eslint-enable no-use-before-define */


const _fetchNav = pathname => new Promise((resolve) => {
  // try {
  //   if (JSON.parse(sessionStorage.getItem('menu')).length > 0) {
  //     resolve()
  //     return
  //   }
  // } catch (e) { e }
  nav({}, (response) => {
    const { list } = response.data
    if (list.length === 0) {
      message.info('该账户没有任何菜单权限，请联系管理员')
      hashHistory.replace('/login')
      // this.setState({ loading: false })
      return
    }
    sessionStorage.setItem('menu', JSON.stringify(list))
    // TODO:添加完菜单权限后，需要增加以下代码
    // if (pathname !== '/' && !isHasCurrentMenu(list, pathname)) {
    //   if (process.env.NODE_ENV === 'production') {
    //     hashHistory.replace('/')
    //   }
    // }
    resolve()
  })
})

/* 不管是否含有ticket参数都会在顶层组件中调用 */
export const validateTickit = async function validateTickit({ query, pathname }, callback) {
  const { ticket } = query
  if (ticket) {
    const loginInfo = await _fetchLoginByTicket(ticket)
    sessionStorage.setItem('token', loginInfo.token)
    // sessionStorage.setItem('isLeftNavMini', false)
  } else {
    /**
     * 仅存在于以下两种情况：
     * 1. 未登录，退出到登录页面进行登录操作，在登录时获取菜单并存到sessionStorage中，再进行页面跳转，执行此代码时只需要请求staff信息
     * 2. 登录过，刷新页面后执行此代码，认为上次登录时已经获取过菜单并已存到sessionStorage中，所以只需要请求staff信息
     *    (FIXME:网速缓慢的情况下，可能存在登录token拿到后，菜单数据返回前，直接输入url访问页面的情况，所以会导致获取不到菜单)
     */
    // await _fetchStaff()
    // if (typeof callback === 'function')callback()
    /*
    _fetchStaff()
    _fetchNav(callback)
    */
  }

  const _a = _fetchStaff()
  const _b = _fetchNav(pathname)
  await _a
  await _b
  if (typeof callback === 'function') callback()
}
/* -----------------------------------------------------------------------------*/

/* -------------- 存储当前页面的菜单id到sessionStorage的menuId属性上 --------------*/
// 比较方法
function compare(children, pathname) {
  for (let i = 0; i < children.length; i += 1) {
    const item = children[i]
    /* eslint-disable no-useless-escape */
    const _resKey = `${item.resKey.replace(/[\$\.\?\+\^\[\]\(\)\{\}\|\\\/]/g, '\\$&').replace(/\*\*/g, '[\\w|\\W]+').replace(/\*/g, '[^\\/]+')}$`
    /* eslint-enable no-useless-escape */
    if (new RegExp(_resKey).test(pathname)) {
      sessionStorage.setItem('menuId', item.id)
      return true
    } else if (item.children) {
      if (compare(item.children, pathname)) return true
    }
  }
  return false
}

// 获取菜单id
export const getMenuId = (navs, pathname) => {
  if (navs && navs.length > 0) {
    compare(navs, pathname)
  }
}
/* -----------------------------------------------------------------------------*/

/* ------------------------- 登陆 -------------------------*/
export const login = (params, success, failure) => {
  loginApi(params, (response) => {
    sessionStorage.setItem('token', response.data.token)
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
    // _fetchNav().then(() => { success() })
    if (typeof success === 'function') success(response)
  }, (response) => {
    if (typeof failure === 'function') failure(response)
  })
}
/* -------------------------------------------------------*/

// 获取按钮
export const fetchBtns = (component, cb) => {
  getBtns({ id: sessionStorage.getItem('menuId') }, (res) => {
    const result = {}
    res.data.list.map((item) => {
      result[item.resKey] = true
    })
    typeof (cb) === 'function' ? cb(result) : ''
  })
}

// 进入路由的判断
export const isLogin = (nextState, replaceState) => {
  if (nextState.location.query && nextState.location.query.ticket) { // 如果url自带ticket
    sessionStorage.setItem('token', 'ticket')
  }
  if (nextState.location.query && nextState.location.query.key) { // 如果url自带key
    sessionStorage.setItem('token', 'key')
  }
  const token = sessionStorage.getItem('token')
  if (!token) { // 没有token，那就返回首页
    replaceState('/login')
  }
}


// 异步请求需要走redux的方式
export const createAjaxAction = (createdApi, startAction, endAction) => (request = {}, resolve, reject, config) => (dispatch) => {
  if (startAction) dispatch(startAction({ req: request, res: {} }))
  const _resolve = (response) => {
    if (endAction) dispatch(endAction({ req: request, res: response }))
    if (resolve) resolve(response)
  }
  return createdApi(request, _resolve, reject, config)
}
