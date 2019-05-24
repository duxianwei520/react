
import { createAction } from 'redux-actions'
import * as common from '@apis/common'
import { createAjaxAction } from '@configs/common'


// login 登陆
export const requestLogin = createAction('request login')
export const recevieLogin = createAction('receive login')
export const login = createAjaxAction(common.login, requestLogin, recevieLogin)

// gFormCache gfor2.0m的缓存
export const setGformCache2 = createAction('set gform cache2')
export const clearGformCache2 = createAction('clear gform cache2')

// socket receive
export const socketReceive = createAction('socketReceive')
