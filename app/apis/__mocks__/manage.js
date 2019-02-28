
import { createApi } from '@ajax'
import { mockURL, path } from '@configs/config'

const prefix = 'usercenter'
const option = { baseURL: mockURL }
// 模块管理
export const fetchModuleList = createApi(`${path}/${prefix}/resource/list`, option) // 获取模块列表
export const fetchModuleDelete = createApi(`${path}/${prefix}/resource/delete`, option) // 删除模块
export const fetchModuleDetail = createApi(`${path}/${prefix}/resource/detail`, option) // 获取模块详情
export const fetchChangeModuleStatus = createApi(`${path}/${prefix}/resource/updateStatus`, option) // 修改模块显隐状态
export const fetchModuleUpdateDetail = createApi(`${path}/${prefix}/resource/update`, option) // 修改模块详情
export const fetchModuleAdd = createApi(`${path}/${prefix}/resource/save`, option) // 新增模块
export const fetchButtonList = createApi(`${path}/${prefix}/resource/button/list`, 'fetchButtonList') // 按钮权限列表

// 角色管理
export const fetchRoleList = createApi(`${path}/${prefix}/role/list`, 'fetchRoleList') // 角色列表
export const fetchRoleAdd = createApi(`${path}/${prefix}/role/save`, option) // 保存角色
export const fetchRoleUpdate = createApi(`${path}/${prefix}/role/update`, option) // 角色编辑
export const fetchRoleDetail = createApi(`${path}/${prefix}/role/detail`, option) // 已选择的菜单以及按钮
export const fetchRoleDelete = createApi(`${path}/${prefix}/role/delete`, option) // 删除角色
export const fetchModuleListInRole = createApi(`${path}/${prefix}/role/resList`, 'fetchModuleListInRole') // 已选择的模块
export const fetchUpdateRoleRes = createApi(`${path}/${prefix}/role/updateRes`, option) // 更新已选择的模块

export const fetchRoleDeletePeople = createApi(`${path}/${prefix}/user/removeRole`, option)
export const fetchUpdateButton = createApi(`${path}/${prefix}/role/updateButton`, option)
export const fetchTreeList = createApi(`${path}/${prefix}/role/resTree`, 'fetchTreeList')
// 用户管理
export const fetchUserDepttList = createApi(`${path}/${prefix}/dept/list`, 'fetchUserDepttList') // 获取用户管理左侧分类列表
export const fetchUserList = createApi(`${path}/${prefix}/user/list`, 'fetchUserList') // 获取用户列表
export const fetchUserDetail = createApi(`${path}/${prefix}/user/detail`, option) // 获取用户详情
export const fetchUserDetailUpdate = createApi(`${path}/${prefix}/user/update`, option) // 修改用户详情
export const fetchUserAdd = createApi(`${path}/${prefix}/user/save`, option) // 新增用户
export const synUser = createApi(`${path}/${prefix}/user/synUser`, option) // 同步用户
export const fetchUserSetRole = createApi(`${path}/${prefix}/user/updateRole`, option) // 修改用户角色
export const fetchUserDelete = createApi(`${path}/${prefix}/user/delete`, option) // 删除用户
export const fetchChangeUserStatus = createApi(`${path}/${prefix}/user/updateStatus`, option) // 设置用户是否冻结状态
