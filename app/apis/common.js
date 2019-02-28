
import { createApi } from '@ajax'
import { mockURL, /* baseURL, */ path } from '@config'

const prefix = 'usercenter'
const option = { baseURL: mockURL }

export const login = createApi(`${path}/${prefix}/login`, option) // 登陆
export const logout = createApi(`${path}/${prefix}/logout`, option) // 登出
export const loginByTicket = createApi(`${path}/${prefix}/loginByTicket`, option) // 通过ticket登陆
export const loginByKey = createApi(`${path}/service/pagerservice/checkKey`, option) // 通过key进入项目
export const staff = createApi(`${path}/${prefix}/user/userInfo`, option) // 用户信息
export const synUser = createApi(`${path}/${prefix}/user/synUser`, option)// 同步用户
export const menu = createApi(`${path}/${prefix}/user/userMenu`, option) // 获取菜单
export const getLevel = createApi(`${path}/${prefix}/user/getLevel`, option) // 当前用户的等级
export const getBtns = createApi(`${path}/${prefix}/resource/listByPid`, option) // 获取菜单id
export const getAllRetrieval = createApi(`${path}/data/sys/retrieval/queryAllRetrievald`) // 获取gForm2.0头部搜索
