# react
一个react+redux+webpack+ES6+antd的SPA的后台管理框架demo

# 安装
npm install
如果安装失败  那么推荐使用淘宝的注册源

# 启动
npm  start
运行本命令后  会自动在当前默认浏览器打开一个窗口  项目就可以跑起来了



# 打包部署
npm run build
打包之后会再当目录生成一个dist文件夹  index.html就是入口文件了 

# 测试
npm run lint
注：测试用的是eslint框架  继承自airbnb的前端语法  后面自己添加修改了一些规则
具体的语法在.eslintigore.json  大家可以根据自己的喜好或者实际项目来调整规则


# 目录结构说明
+ .config.json  里面配置的是获取后端接口的地址  接口地址不对的话   某些页面可能会自动频繁的刷新噢
+ .gitignore是上传到git的配置信息
+ webpack.config.js当然就是webpack的配置了  
+ package.json  就是我们整个项目要依赖的npm包的列表
+ app里面就是我们整个项目的源文件  
+ index.html是我们依赖的页面  有一个跟id   还有其他的也要要用到的常量等等
+ client.js是入口js  
+ routes.js  当然就是路由系统了  里面可以做一些验证登录的事情  在路由的onEnter里面做就行  
+ utils里面就是一些常用的功能的封装  比如发送的ajax请求
+ actions、API、reducers这几个文件夹  是用来处理跟后端交互的文件夹 比如实有房屋打开这个页面打开控制台会看到发送了一个ajax请求  这些请求都是post形式的噢

+ pages：存放的是我们的大部分业务文件
+ components：当然就是我们公用的一些组件了  可以理解为jQuery框架的jQuery插件
+ containers：存放的是我们基本的页面的组件  比如说头部 左侧 中间内容区的布局 
