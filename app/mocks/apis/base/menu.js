
module.exports = {
  data: {
    list: [

      {
        id: 10063,
        resName: '概览',
        resKey: 'desk$/index',
        resIcon: 'pgmb',
      },
      // {
      //   id: 10064,
      //   resName: 'socket接收',
      //   resKey: 'socketReceive',
      //   resIcon: 'pgmb',
      // },
      {
        id: 600110233,
        resName: '图表',
        resKey: 'echarts',
        resIcon: 'statistics',
      },
      {
        id: 100631,
        resName: '编辑器',
        resKey: 'editor',
        resIcon: 'duty',
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
            resIcon: 'moduleManage',
          },
        ],
        resKey: 'set$',
        resIcon: 'xtxg',
      },
    ],
  },
  msg: '操作成功',
  status: 1,
}
