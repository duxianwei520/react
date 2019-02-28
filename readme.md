
# Readme for English
## Technology stack

react@16.5.2 + redux@3.7.2 + react-router@3.2.0 + webpack@3.10.0 + axios@0.18.0 + less@2.7.1 + antd@3.10.1

[![CircleCI branch](https://img.shields.io/circleci/project/github/duxianwei520/react/master.svg?style=flat-square)](https://circleci.com/gh/duxianwei520/react)
[![GitHub forks](https://img.shields.io/github/forks/duxianwei520/react.svg)](https://github.com/duxianwei520/react/network)
[![GitHub stars](https://img.shields.io/github/stars/duxianwei520/react.svg)](https://github.com/duxianwei520/react/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/duxianwei520/react.svg)](https://github.com/duxianwei520/react/issues)
[![GitHub license](https://img.shields.io/github/license/duxianwei520/react.svg)](https://github.com/duxianwei520/react/blob/master/LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/duxianwei520/react/badge.svg)](https://coveralls.io/github/duxianwei520/react)
## Project introduce

```
git clone --depth 1 https://github.com/duxianwei520/react.git  

cd react 

npm install 

npm start 
```

#### Notice

If you wan to experience the chatroom, you need to start socket service first, so you need to run another node service like this
```
npm run chat
```
and if you want to publish your app, use the following line of commands
```
npm run build 

```

This is the basic structure of the data returned by the server.

```
{
  data: {
    totalCount: 100,
    currentPage: 1,
    pageSize: 10,
    'list': [
    ],
  },
  msg: '',
  status: 1,
}
```
All asynchronous request returns will be processed by 'ajax.js' in configs folder. If there is no problem with the request, the `status` return value is `1`;
If the request is wrong, such as a parameter error or other error, the `status` return value is `0`;
If the status value is `-1`, indicating that the login timed out, then the login will pop up.
These parameters can be adjusted according to the actual situation, and the error message or successful prompt information is returned in `msg`.
The current project integrates basic user management, role management, module management and other basic rights management functions. The small partners must start `npm run mock` at the same time to see 



## Description 

>  development environment: win10  Chrome 63.0.3239.132  nodejs 8.7.0


>  If you have any questions, please mention them directly in the Issues. I will answer in the first time, or you find that the problem has a very good solution, welcome PR

### Cancel http request example：
```
import axios from 'axios'
const axiosHandle = axios.CancelToken.source()

login(){
  this.props.dispatch(fetchLogin(values, (res) => {},(error)=>{},axiosHandle)
  setTimeout(() => {
    axiosHandle.cancel('cancel handle')
  }, 3000)
}

```


## Reatures list
- [√] The project is loaded by the routing module
- [√] login
- [√] logt out
- [√] welcome page
- [√] menu 
- [√] redux demo
- [√] mockjs to mock interface
- [√] use flex to adapt page height
- [√] cors
- [√] webpack bundle analyzer
- [√] editor draftjs 
- [√] chatroom



## screenshots



### login

<img src="https://github.com/duxianwei520/resource/blob/master/react/screenshots/login.gif" width="973" height="557"/>

### echart

<img src="https://github.com/duxianwei520/resource/blob/master/react/screenshots/echart.gif" width="973" height="557"/>

### chatroom

<img src="https://github.com/duxianwei520/resource/blob/master/react/screenshots/chat.gif" width="973" height="557"/>

### set center

<img src="https://github.com/duxianwei520/resource/blob/master/react/screenshots/set.gif" width="973" height="557"/>


### webpack bundle analysis

<img src="https://github.com/duxianwei520/resource/blob/master/react/screenshots/analysis.gif" width="973" height="557"/>

### build dist folder

<img src="https://github.com/duxianwei520/resource/blob/master/react/screenshots/dist.gif" width="973" height="557"/>


## License

[MIT](https://github.com/duxianwei520/react/blob/master/LICENSE)


## communication
If you want to communicate with other friends who use react,you can join the react QQ group I created：159697743~



---
# 中文readme


[![CircleCI branch](https://img.shields.io/circleci/project/github/duxianwei520/react/master.svg?style=flat-square)](https://circleci.com/gh/duxianwei520/react)
[![GitHub forks](https://img.shields.io/github/forks/duxianwei520/react.svg)](https://github.com/duxianwei520/react/network)
[![GitHub stars](https://img.shields.io/github/stars/duxianwei520/react.svg)](https://github.com/duxianwei520/react/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/duxianwei520/react.svg)](https://github.com/duxianwei520/react/issues)
[![GitHub license](https://img.shields.io/github/license/duxianwei520/react.svg)](https://github.com/duxianwei520/react/blob/master/LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/duxianwei520/react/badge.svg)](https://coveralls.io/github/duxianwei520/react)

## 项目技术栈

react@16.5.2 + redux@3.7.2 + react-router@3.2.0 + webpack@3.10.0 + axios@0.18.0 + less@2.7.1 + antd@3.10.1



## 项目运行


```
git clone --depth 1 https://github.com/duxianwei520/react.git  

cd react 

npm install 

npm start 
```
### 对了，如果有小伙伴因为网络原因npm包下载不下来，那么可以试用我已经下载好的安装包，地址在
```
https://github.com/duxianwei520/resource/blob/master/react/node_modules.rar

```
欢迎下载
想要体验聊天室功能  先开启socket服务 运行命令

```
npm run chat

```
最后的构建命令
```
npm run build (打包，部署)

```

对了，服务端返回的格式我们是这样子一个数据结构

```
{
  data: {
    totalCount: 100,
    currentPage: 1,
    pageSize: 10,
    'list': [
    ],
  },
  msg: '',
  status: 1,
}

```
所有异步请求返回都会经过configs里面的ajax.js做处理，如果请求没有任何问题，那status返回值是1；
如果请求错误，比如说参数错误或者其他报错之类的，那status返回值就是0；
如果status值是-1，表示登录超时，那么就会跳出登录。
这些参数都可以根据实际情况进行调整，报错或者成功的提示信息放在msg里面返回。
当前项目集成了完整的用户管理、角色管理、模块管理等基本的权限管理功能，小伙伴们一定要同时启动npm run mock才可以看到噢

这个react的项目我有在跟nodejs的express框架配合做接口的开发，可以不靠后端输出数据库真实的数据，仓库地址在

```
https://github.com/duxianwei520/express

```
还有一个原生的nodejs版本的，仓库库地址是

```
https://github.com/duxianwei520/node

```
基本功能差不多，目前实现了注册登录以及获取用户信息等3个接口的真实api


## 说明

>  开发环境 win10  Chrome 63.0.3239.132（正式版本） （32 位） nodejs 8.7.0

>  如果npm install太慢导致有些npm依赖包下载失败 你可以看控制台的报错信息，再手动npm install 具体的开发包，推荐使用淘宝的注册源，直接运行，

```
npm install -g cnpm --registry=https://registry.npm.taobao.org 

```


>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

### 取消http请求示例：
```
import axios from 'axios'
const axiosHandle = axios.CancelToken.source()

login(){
  this.props.dispatch(fetchLogin(values, (res) => {},(error)=>{},axiosHandle)
  取消请求的操作
  setTimeout(() => {
    axiosHandle.cancel('手动取消。')
  }, 3000)
}

```


## 功能一览
- [√] 项目按路由模块加载
- [√] 登录，以及登录权限控制
- [√] 退出
- [√] 欢迎主页
- [√] 左侧菜单，正常mini切换
- [√] redux完整示范
- [√] mockjs模拟后端返回接口
- [√] 页面高度flex自适应
- [√] axios数据跨域的设置
- [√] 实时的webpack包大小预览,方便优化
- [√] draftjs编辑器
- [√] 聊天室



## License

[MIT](https://github.com/duxianwei520/react/blob/master/LICENSE)


## 交流
想跟其他的使用react的小伙伴们交流的话，
可以加入我创建的reactQQ群：159697743


