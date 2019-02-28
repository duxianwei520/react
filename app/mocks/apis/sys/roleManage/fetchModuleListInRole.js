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
            resType: 1,
            status: 0,
            parentId: 10060,
          },
        ],
        resKey: 'desk$',
        resIcon: 'home',
        resType: 1,
        status: 0,
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
            parentId: 10062,
            children: [
              {
                id: 11003,
                resName: '看看',
                resKey: 'desk$/index',
                resIcon: 'cleanAccess',
                parentId: 10108,
                children: [
                  {
                    id: 11004,
                    resName: '测试',
                    resKey: 'desk$/index',
                    resIcon: 'cleanAccess',
                    parentId: 11003,
                  },
                ],
              },
            ],
          },
          {
            id: 10109,
            resName: '角色管理',
            resKey: 'set$/roleManage',
            resIcon: 'roleManage',
            parentId: 10062,
          },
          {
            id: 10110,
            resName: '权限管理',
            resKey: 'set$/moduleManage',
            resIcon: 'unitCount',
            parentId: 10062,
          },
        ],
        resKey: 'set$',
        resIcon: 'set',
        resType: 1,
        status: 0,
      },
    ],
  },
  msg: '',
  errorCode: '',
  status: 1,
};
