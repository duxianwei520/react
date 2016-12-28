# react
一个react+redux+webpack+ES6+antd的SPA的后台管理框架demo

# 安装
npm install
如果安装失败  那么推荐使用淘宝的注册源 直接运行 npm install -g cnpm --registry=https://registry.npm.taobao.org

# 启动
npm  start
运行本命令后  会自动在当前默认浏览器打开一个窗口  项目就可以跑起来啦



# 打包部署
npm run build
打包之后会再当目录生成一个dist文件夹  index.html就是入口文件 

# 测试
npm run lint
注：测试用的是eslint框架  继承自airbnb的前端语法  后面自己添加修改了一些规则
具体的语法在.eslintigore.json  大家可以根据自己的喜好或者实际项目来调整规则


# 目录结构说明
+ .config.json  里面配置的是获取后端接口的地址  接口地址不对的话   某些页面可能会自动频繁的刷新噢
+ .gitignore是忽略上传到github的配置文件
+ webpack.config.js当然就是webpack的配置了  
+ package.json  就是我们整个项目要依赖的npm包的列表
+ app里面就是我们整个项目的源文件  
+ index.html是我们依赖的页面  定义了一些全局要用到的常量
+ client.js是入口js  
+ routes.js  定义路由的js  目前的验证登录放在路由里面做了 
+ utils里面就是一些常用的功能的封装  比如发送的ajax请求
+ actions、API、reducers这几个文件夹  是redux的用来处理跟后端交互的文件 比如实有房屋打开这个页面打开控制台会看到发送了一个ajax请求  这些请求都是post形式的噢

+ pages：存放的是我们的大部分业务文件
+ components：存放的是公用的一些组件  可以理解为jQuery框架的jQuery插件
+ containers：存放的是我们基本的页面的组件  比如说头部 左侧 中间内容区的布局 
