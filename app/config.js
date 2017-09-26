export default (() => {
  window.$GLOBALCONFIG = {};
  +function (global) {
    // 本地开发打开的路径以及端口
    global.$ctx = 'http://localhost:8080';

    // 用户登录信息
    global.STAFF = {
      code: 'admin',
      name: '黄焖鸡',
    };

    // 系统一二级菜单
    global.NAVIGATION = [
      {
        id: 600110230,
        name: '菜单列表',
        icon: 'book',
        url: '',
        children: [
            { id: 600110232, name: '表格', url: 'table', icon: 'user' },
            { id: 600110233, name: '图表', url: 'echarts', icon: 'area-chart' },
        ],
      },
      {
        'id': 600110430,
        'name': '老铁',
        'icon': 'calculator',
        'url': '',
        'children': [
            { 'id': 600110431, 'name': '情书小老弟', 'url': 'test', 'icon': 'book' },
        ],
      },
    ];
  }(window.$GLOBALCONFIG);
})()

