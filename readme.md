# 前言

为什么选择react而不是vue也不是angular？

ng1.x老衲用过3个月，觉得整个框架组织结构更像是专门为系统指定的，要什么有什么，这样的话对于在线mobile app性能是个大的考验，还有一个不喜欢的点是他的写法更像是PHP哪种形式的绑定，后端的MVC思维浓厚

vue贫道也做过一个微信端的小项目，觉得还是比较容易上手的，1.x感觉跟ng1.x的思想上更加接近，但是对于开发app的话，没有weex也只能依赖于cordova之类的混合开发，觉得在性能上可能还是差了许多，再有一个重要的点就是，主要是尤小溪个人的项目，虽然后面也有不少的人加入，但是贫道还是觉得个人的力量相对公司还是有限，当然这也不妨碍我贫道在一些比较小的项目中去用vue。

最后react可能是所有方案里面最合适最这种的一个技术栈了，不加全家桶的话，跟vue一样的轻量，移动端有比较成熟的react native。

so，就是这个啦


## 技术栈

react + redux + react-router + webpack7 + fetch + less



## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，nodejs 必须是 6.0 以上版本 ，node 7 是先行版，有可能会出问题，建议使用 node 6 稳定版

```
git clone https://github.com/duxianwei520/react.git  

cd react （进入当前的项目）

npm install  (安装依赖包)

npm start (运行本地开发环境)

npm run build (打包)

另开启一个命令窗口 启动node的本地json数据代理服务

npm run mock (对，就是传说中的 mockjs http://highsea90.com/t/mock/)

想要体验聊天室功能  先开启socket服务 运行命令

npm run chat

```


## 说明

>  喜欢的别忘记了可以star一下的噢！ 

>  开发环境 win10  Chrome 58.0.3029.110  nodejs 6.2.0

>  如果npm install太慢导致有些npm依赖包下载失败 你可以看控制台的报错信息，再手动npm install 具体的开发包，推荐使用淘宝的注册源，直接运行，
```
npm install -g cnpm --registry=https://registry.npm.taobao.org 

```
如果这个方法还不行的话，可以到我的百度网盘上面去下载我已经压缩好的npm依赖包，地址是
``` 
https://pan.baidu.com/s/1c1MMUHU

```
把下载到本地的node_modules.rar文件直接解压到跟app同级的当前文件夹，记住是当前文件夹的，然后不用npm install就可以直接npm start跑起来项目了。

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍



## 功能一览
- [√] 项目按路由模块加载
- [√] 登录，以及登录权限控制
- [√] 退出
- [√] 欢迎主页
- [√] 左侧菜单，正常mini切换
- [√] redux完整示范
- [√] mockjs模拟后端返回接口
- [√] 页面高度flex自适应
- [√] fetch数据跨域的设置
- [√] 实时的webpack包大小预览,方便优化
- [√] draftjs编辑器
- [√] kindeditor编辑器
- [√] 聊天室



## 总结

1、这整个技术栈是我们公司前端部门在用的，写熟悉了之后，用来做后台管理系统类的实在是很方便，大家都表示再也不要用jQuery来做这样子的系统了

2、目前来说，不足的地方是在于没有很好的区分dev环境跟pro环境，这个后面弄好了再补充上来；mock数据现在还不是那么的方便，需要自己一个个的添加api的json文件




## 部分截图


### 列表页 mock数据返回

<img src="https://github.com/duxianwei520/react/blob/master/screenshots/list.gif" width="1082" height="557"/>

### 图表

<img src="https://github.com/duxianwei520/react/blob/master/screenshots/echart.gif" width="976" height="586"/>

### Facebook官方富文本编辑器draft.js

<img src="https://github.com/duxianwei520/react/blob/master/screenshots/draft.gif" width="976" height="586"/>

### 富文本编辑器kindeditor

<img src="https://github.com/duxianwei520/react/blob/master/screenshots/kindeditor.gif" width="976" height="586"/>

### 聊天室

<img src="https://github.com/duxianwei520/react/blob/master/screenshots/chat.gif" width="1331" height=""/>


### 构建完成的包的分析截图

<img src="https://github.com/duxianwei520/react/blob/master/screenshots/analysis.png" width="1101" height="555"/>


## 项目结构

```
.
├─.babelrc                            // babel的配置
├─.config.json                        // 如果使用了ip代理，那么配置文件在这里
├─.eslintcache                        // eslint的缓存
├─.eslintignore	                      // eslint设置忽略的文件
├─.eslintrc.json                      // eslint的配置文件
├─.gitignore                          // git忽略上传的文件
├─package.json                        // npm命令包
├─readme.md                           // 项目介绍
├─_config.yml 
├─_gitattributes
├─test
|  └setup-test-env.js
├─screenshots                         // 项目截图
|      ├─list.png
|      ├─login.png
|      ├─receiveData.png
|      ├─requestData.png
├─app                                 // 页面主文件
|  ├─client.js
|  ├─history.js
|  ├─index.html                       // 入口html文件，配置静态菜单等全局常见变量
|  ├─routes.js                        // 路由配置
|  ├─utils                            // 公用的文件
|  |   ├─ajax.js                      // 发送异步获取数据的配置
|  |   ├─config.js                    // 常用的配置
|  |   └index.js                      // 发送异步数据前的准备工作
|  ├─style                            // 样式库
|  |   ├─base.less                    // 全局通用的样式
|  |   └theme.less                    // 存放变量的less
|  ├─store                            // redux的store的配置
|  |   └configureStore.js
|  ├─reducers                         // reduce的配置
|  |    ├─common.js
|  |    ├─house.js
|  |    ├─index.js
|  |    └tabList.js
|  ├─pages                            // 项目绝大部分业务文件
|  |   ├─welcome.js
|  |   ├─test
|  |   |  ├─index.js
|  |   |  ├─sub.js
|  |   |  └third.js
|  |   ├─house
|  |   |   ├─houseManage.js
|  |   |   └index.js
|  ├─middleware                       
|  |     ├─index.js
|  |     ├─logger.js
|  |     └router.js
|  ├─images                           // 图片文件夹
|  |   ├─default.png
|  |   ├─leftBg.jpg
|  |   └navcontrol.png
|  ├─iconfont
|  |    ├─iconfont.eot
|  |    ├─iconfont.svg
|  |    ├─iconfont.ttf
|  |    └iconfont.woff
|  ├─containers                       // 全局的框架文件 
|  |     ├─App
|  |     |  ├─extra.js
|  |     |  ├─footer.js
|  |     |  ├─header.js
|  |     |  ├─index.js
|  |     |  ├─login.js
|  |     |  ├─rightAside.js
|  |     |  ├─tabList.js
|  |     |  ├─leftNav
|  |     |  |    └index.js
|  ├─constants
|  |     ├─actionTypes.js
|  |     └index.js
|  ├─components                        // 公用的组件库 
|  |     ├─index.less
|  |     ├─searchTable
|  |     |      └index.js
|  |     ├─searchForm
|  |     |     └index.js
|  |     ├─searchChosen
|  |     |      └index.js
|  |     ├─multiSelect
|  |     |      └index.js
|  ├─api                              // 整个项目API的url配置
|  |  ├─common.js
|  |  ├─house.js
|  |  └index.js
|  ├─actions                          // 整个项目的actions配置
|  |    ├─common.js
|  |    ├─house.js
|  |    └tabList.js


```


## License

[GPL](https://github.com/duxianwei520/react/blob/master/COPYING)


## 交流
想跟其他的使用react的小伙伴们交流的话，
可以加入我创建的reactQQ群：598372207~
