
module.exports = {
  data: {
    list: [
      {
        id: 10060,
        resName: '工作台',
        children: [
          {
            id: 10063,
            resName: '概览',
            resKey: 'desk$/index',
            resIcon: 'cleanAccess',
          },
        ],
        resKey: 'desk$',
        resIcon: 'home',
      },
      {
        id: 10062,
        resName: '设置中心',
        children: [
          {
            id: 10108,
            resName: '用户管理',
            resKey: 'set$/userManage',
            resIcon: 'userManage',
          },
          {
            id: 10109,
            resName: '角色管理',
            resKey: 'set$/roleManage',
            resIcon: 'roleManage',
          },
          {
            id: 10110,
            resName: '权限管理',
            resKey: 'set$/moduleManage',
            resIcon: 'unitCount',
          },
        ],
        resKey: 'set$',
        resIcon: 'set',
      },
    ],
  },
  msg: '操作成功',
  status: 1,
}
