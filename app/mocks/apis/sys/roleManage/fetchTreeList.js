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
            parentId: 10060,
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
            parentId: 10062,
            buttons: [
              {
                id: 432,
                resName: '上传照片',
                resType: 3,
                parentId: 427,
                resKey: 'upload',
                status: 0,
              },
              {
                id: 433,
                resName: '查看照片',
                resType: 3,
                parentId: 427,
                resKey: 'view',
                status: 0,
              },
              {
                id: 434,
                resName: '删除照片',
                resType: 3,
                parentId: 427,
                resKey: 'delete',
                status: 0,
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
      },
    ],
  },
  msg: '',
  errorCode: '',
  status: 1,
};
