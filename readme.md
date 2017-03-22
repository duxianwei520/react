# react
一个已经运用在实际企业项目中的react+redux+webpack+ES6+antd+less的SPA后台管理框架demo

# 项目最适合用的场景
咱们这个项目，最适合用在PC端的管理后台系统之类的，首先浏览器环境只是Chrome，方便快捷，不用考虑那么多恶心的兼容性问题，如果想兼容其他的自己慢慢调整咯；其次，所有文件打包成一个，其实比较方便的，当然如果功能实在太过强大多了，那么我最近的这次更新就是为了按照路由做的按需加载上去了；最后，管理后台默认用的antd的UI组件，如果小伙伴们不喜欢的话，那就自行去掉或者换其他的组件库，比如material UI都行，慢慢的去掉排错就好了。

# 安装
npm install
如果npm源太慢导致安装失败  那么推荐使用淘宝的注册源 直接运行 npm install -g cnpm --registry=https://registry.npm.taobao.org 如果前面的方法都不好使的话，大家请到我的百度网盘上面去下载我已经压缩好的npm依赖包，地址是http://pan.baidu.com/s/1clFEME，把下载到本地的node_modules.rar文件直接解压到跟app同级的当前文件夹，记住是当前文件夹的，然后不用npm install就可以直接npm start跑起来项目了。

## git的安装
https://git-scm.com/download/win  在这里下载对应的git工具  安装之后  右键就可以看到git bush这个命令行  可以让我们快速的进入到指定的项目区运行  而不用Windows原生的cmd命令行窗口cd进去指定的目录 而且语法命令高亮也比较不错  喜欢的小伙伴可以去下载安装了

# 启动
npm  start
运行本命令后  会自动在当前默认浏览器打开一个窗口  项目就可以跑起来啦
如果报错  比如提示缺少webpack-dev-server   那么请单独运行明令npm install webpack-dev-server来安装这个包 其他的包确实也可以采用类似的方法再单独安装

# 打包部署
npm run build
打包之后会再当目录生成一个dist文件夹  index.html就是入口文件 

# 代码语法测试
npm run lint
注：测试用的是eslint包  继承自airbnb的前端语法  后面自己添加修改了一些规则
具体的语法在.eslintigore.json  大家可以根据自己的喜好或者实际项目来调整规则


# 目录结构说明
+ .config.json  里面配置的是获取后端接口的地址（也可以用你自己的服务器，比如你自己本地安装一个wamp也可以的啦）  接口地址不对的话   页面会自动刷新噢
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


# 可以改善的问题
+ 数据模拟目前没有用到mockjs，不过暂时想到的是自己建立一个转发服务器，比如我用的就是一个wamp的PHP服务器，把造好的json文件放在里面，然后就在项目里面fetch这个json文件，就可以真实的模拟数据请求了，但还是没mockjs那么方便强大
+ dev环境跟pro或者test环境没有单独的对webpack做配置，所以部署的时候要改index.html请求路径等等
+ 如果文件过多，start跟build文件的时候比较费劲


# 最后
如果小伙伴们想要更多的交流，可以加一下我创建的react群，598372207（不过考虑到群内更好的交流，希望申请进群的小伙伴最好对react有点基础的了解，至少要知道react组件的生命周期，只要路由的用法，state跟props的区别）

我上面提到的一些问题，如果有哪位小伙伴比较有兴趣跟我一起维护这个框架的话，请联系我，这个项目我已经拷贝出来一份去进行多人维护的，目前已经有3个人了项目地址在这里，https://github.com/react-redux-antd-es6/react  希望咱们可以把这个框架做得越来越好，开源是极好滴~~