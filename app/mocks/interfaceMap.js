
const path = '/mock'

// #region
const base = require('./apis/base') // 基础的接口
const userManage = require('./apis/sys/userManage') // 用户管理
const roleManage = require('./apis/sys/roleManage') // 角色管理
const moduleManage = require('./apis/sys/moduleManage') // 模块管理
// #endregion

module.exports = {
  // #region 收起所有

  // #region 公用
  [`${path}/usercenter/login`]: base.login, // 登录
  [`${path}/usercenter/user/userMenu`]: base.menu, // 菜单
  [`${path}/usercenter/user/userInfo`]: base.staff, // 用户信息
  [`${path}/usercenter/logout`]: base.logout, // 退出
  // #endregion

  // #region 用户管理
  [`${path}/usercenter/role/list`]: userManage.fetchRoleList, // 角色列表
  [`${path}/usercenter/dept/list`]: userManage.fetchUserDepttList, // 部门列表
  [`${path}/usercenter/user/list`]: userManage.fetchUserList, // 用户列表
  [`${path}/usercenter/user/detail`]: userManage.fetchUserDetail, // 获取用户详情
  [`${path}/usercenter/user/update`]: userManage.fetchUserDetailUpdate, // 修改用户详情
  [`${path}/usercenter/user/save`]: userManage.fetchUserAdd, // 新增用户
  [`${path}/usercenter/user/synUser`]: userManage.synUser, // 新增用户
  [`${path}/usercenter/user/updateRole`]: userManage.fetchUserSetRole, // 修改用户角色
  [`${path}/usercenter/user/delete`]: userManage.fetchUserDelete, // 删除用户
  [`${path}/usercenter/user/updateStatus`]: userManage.fetchChangeUserStatus, // 设置用户是否冻结状态
  // #endregion

  // #region 角色管理
  [`${path}/usercenter/role/save`]: roleManage.fetchRoleAdd, // 保存角色
  [`${path}/usercenter/role/delete`]: roleManage.fetchRoleDelete, // 删除角色
  [`${path}/usercenter/role/update`]: roleManage.fetchRoleUpdate, // 角色编辑
  [`${path}/usercenter/role/resTree`]: roleManage.fetchTreeList, // 角色列表
  [`${path}/usercenter/role/resList`]: roleManage.fetchModuleListInRole, // 已选择的模块
  [`${path}/usercenter/role/detail`]: roleManage.fetchRoleDetail, // 已选择的菜单以及按钮
  [`${path}/usercenter/resource/button/list`]: roleManage.fetchButtonList, // 模块的按钮列表
  [`${path}/usercenter/user/removeRole`]: roleManage.fetchRoleDeletePeople, // 删除用户
  [`${path}/usercenter/role/updateButton`]: roleManage.fetchUpdateButton, // 更新按钮
  [`${path}/usercenter/role/updateRes`]: roleManage.fetchUpdateRoleRes, // 更新已选择模块
  // #endregion

  // #region 模块管理
  [`${path}/usercenter/resource/list`]: moduleManage.fetchModuleList, // 获取模块列表
  [`${path}/usercenter/resource/delete`]: moduleManage.fetchModuleDelete, // 删除模块
  [`${path}/usercenter/resource/detail`]: moduleManage.fetchModuleDetail, // 获取模块详情
  [`${path}/usercenter/resource/updateStatus`]: moduleManage.fetchChangeModuleStatus, // 修改模块显隐状态
  [`${path}/usercenter/resource/update`]: moduleManage.fetchModuleUpdateDetail, // 修改模块详情
  [`${path}/usercenter/resource/save`]: moduleManage.fetchModuleAdd, // 新增模块
  // #endregion

  // #endregion
}
