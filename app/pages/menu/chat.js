
import React, { Component } from 'react'
// import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Button, Input, Icon, Form, Dropdown, message } from 'antd'
import * as io from 'socket.io-client'
import '@styles/im.less'

const FormItem = Form.Item
@Form.create()

@connect((state, props) => ({
  config: state.config,
}))

export default class popCheck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showIm: true, // 是否显示im
      users: [], // 所有在线用户
      usersTem: [], // 左侧显示的用户列表
      recordList: [
        // {
        //   id: 1,
        //   type: 'user',
        //   name: '紫薇',
        //   time: '2017-10-30 18:50:12',
        //   isSelf: false,
        //   content: '山无棱天地合才敢与君绝',
        //   src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        // },
        // {
        //   id: 2,
        //   type: 'user',
        //   name: '尔康',
        //   time: '2017-10-30 18:50:12',
        //   isSelf: true,
        //   content: '海可枯 石可烂 激情永不散',
        //   src: 'http://tvax2.sinaimg.cn/crop.0.10.1242.1242.50/7d7256a1ly8fk6hkgoyexj20yi0z2jvn.jpg',
        // },
        // {
        //   id: 3,
        //   type: 'system',
        //   name: 'dupi',
        //   time: '2017-10-30 18:50:12',
        //   content: '加入了群聊',
        // },
      ], // 聊天信息列表
      count: 0, // 当前在线人数
    }
  }

  componentDidMount() {
    this.loadSocket()
    // document.body.addEventListener('click', () => this.setState({ showIm: false }))
  }

  loadSocket() {
    const that = this
    // const script = document.createElement('script')
    // script.type = 'text/javascript'
    // script.src = '../../components/socket.io.js'
    // document.body.appendChild(script)
    // script.onload = () => {
    const url = window.location.hostname
    that.socket = io.connect(`http://${url}:3333/`)

    // 测试是否链接上websocket
    that.socket.on('connect', () => console.log('连接socket服务器成功'))

    that.socket.emit('login', sessionStorage.getItem('username'))

    // 有新的消息发送
    that.socket.on('newMsg', (user, msg, color) => {
      this._displayNewMsg(user, msg, color)
    })

    // 登录聊天室成功
    that.socket.on('loginSuccess', (nickName, users) => {
      // console.log(users)
      const arr = []
      users.map((item, index) => {
        arr.push({ name: item, id: index })
      })
      that.setState({
        users: arr,
        count: arr.length,
        usersTem: arr,
      })
    })

    // 用户名重名
    that.socket.on('nickExisted', (nickName, users) => {
      message.error('登录用户名重复，请重新登录设置不同的用户名', 5)
      setTimeout(() => {
        hashHistory.push('/login')
      }, 3000)
    })

    // 监听错误消息
    that.socket.on('error', (err) => {
      // console.log(err)
    })

    // 监听系统消息
    this.socket.on('system', (nickName, users, type) => {
      // console.log(nickName, users, type)
      if (users.length) {
        const arr = []
        users.map((item, index) => {
          arr.push({ name: item, id: index })
        })
        that.setState({
          users: arr,
          usersTem: arr,
          count: arr.length,
        })
      }

      let typeNew
      if (type === 'login') {
        typeNew = '加入了'
      }
      if (type === 'logout') {
        typeNew = '离开了'
      }
      this._displayNewMsg('system', `${nickName}${typeNew}群聊`, 'color')
    })
    // }
  }

  // 显示消息
  _displayNewMsg = (user, msg, color) => {
    // console.log(user, msg, color)
    const { recordList } = this.state
    let obj = {}
    const id = recordList.length + 1
    // const time = (new Date()).format('yyyy-MM-dd hh:mm:ss')
    const time = (new Date()).toLocaleString()
    const msgNew = this._showEmoji(msg)
    // 如果是自己发的消息
    if (user === sessionStorage.getItem('username')) {
      obj = {
        id: id,
        type: 'user',
        name: user,
        time: time,
        isSelf: true,
        content: msgNew,
        src: '',
      }
    }
    // 系统消息
    if (user === 'system') {
      obj = {
        id: id,
        type: 'system',
        name: '',
        time: time,
        content: msgNew,
      }
    }
    // 其他用户发送的消息
    if (user !== sessionStorage.getItem('username') && user !== 'system') {
      obj = {
        id: id,
        type: 'user',
        name: user,
        time: time,
        isSelf: false,
        content: msgNew,
        src: '',
      }
    }
    recordList.push(obj)
    this.setState({ recordList: recordList }, () => {
      // console.log(recordList)
      const container = document.getElementById('recordList')
      container.scrollTop = container.scrollHeight
      this.props.form.resetFields()
    })
  }

  // 初始化表情选择列表
  _initEmoji() {
    const emojis = []
    const url = window.location.href.split('#')[0]
    for (let i = 1; i < 70; i += 1) {
      emojis.push(i)
    }
    return (
      <div className="emojis" id="emojis">
        {
          emojis.map(item =>
            (<span
              key={item}
              title={item}
              className="face"
              onClick={() => this.faceClick(item)}
            ><img alt="" src={`${url}images/emoji/${item}.gif`} />
            </span>))
        }
      </div>
    )
  }

  // 将用户发送的表情包转义
  _showEmoji = (msg) => {
    const url = window.location.href.split('#')[0]
    let match
    let result = msg
    const reg = /\[emoji:\d+\]/g
    let emojiIndex
    const totalEmojiNum = 70
    // eslint-disable-next-line
    while (match = reg.exec(msg)) {
      emojiIndex = match[0].slice(7, -1)
      // console.log(match)
      if (emojiIndex <= totalEmojiNum) {
        result = (<img alt="" src={`${url}images/emoji/${emojiIndex}.gif`} />)
      }
    }
    return result
  }

  // 表情点击事件
  faceClick(i) {
    // const msg = this.props.form.getFieldValue('msg')
    // this.props.form.setFieldsValue({ msg: `${msg}[emoji:${i}]` })
    // document.getElementById('msg').focus()
    this.socket.emit('postMsg', `[emoji:${i}]`, 'color')
    this._displayNewMsg(sessionStorage.getItem('username'), `[emoji:${i}]`, 'color')
  }

  // 按发送按钮发送消息
  handleSubmit = (e) => {
    e.preventDefault()
    const msg = this.props.form.getFieldValue('msg')
    if (msg) {
      this.socket.emit('postMsg', msg, 'color')
      this._displayNewMsg(sessionStorage.getItem('username'), msg, 'color')
    }
  }

  // 按下回车按钮发送消息
  handleEnter = (e) => {
    e.preventDefault()
    const msg = this.props.form.getFieldValue('msg')
    if (e.keyCode === 13 && msg.trim().length !== 0) {
      this.handleSubmit(e)
    }
  }

  // 搜索用户
  handleSearch = (e) => {
    // console.log(e.target.value)
    const key = e.target.value.trim()
    const { users } = this.state
    const arr = []
    users.map((item) => {
      if (item.name.indexOf(key) > -1) {
        arr.push(item)
      }
    })
    this.setState({
      usersTem: arr,
    })
    if (key.trim().length === 0) {
      this.setState({
        usersTem: users,
      })
    }
  }

  // 清空聊天记录
  handleClear = () => {
    this.setState({
      recordList: [],
    })
  }

  render() {
    const {
      showIm, recordList, usersTem, count,
    } = this.state
    const { getFieldDecorator } = this.props.form
    // console.log(recordList)
    return (
      <div className="page">
        {
          showIm ?
            <div className="im" id="im">
              <div className="im-l">
                <div className="search">
                  <Input
                    type="text"
                    onChange={e => this.handleSearch(e)}
                    placeholder="输入关键字查询"
                  />
                </div>
                <ul>
                  {
                    usersTem.map(item => (
                      <li key={item.name} className={item.name === sessionStorage.getItem('username') ? 'on' : ''}>
                        <Icon type="github" />
                        <span className="name" title={item.name}>{item.name}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <div className="im-r">

                <div className="im-r-box">

                  <div className="operate">
                    <div className="totle">当前在线人数:<span className="count">{count}</span></div>
                    <span>
                      <Icon type="close" onClick={() => this.setState({ showIm: false })} />
                    </span>
                  </div>

                  <div className="record-list" id="recordList">
                    {
                      recordList.map((item) => {
                        if (item.type === 'system') { // 系统消息
                          return (
                            <div key={item.id} className="system">
                              系统消息：{item.name}{item.content}
                              <span className="time">{item.time}</span>
                            </div>
                          )
                        }
                        // 普通用户的消息
                        return (
                          <div key={item.id} className={item.isSelf ? 'item item-r' : 'item'}>
                            <div className="item-avatar">
                              {
                                // <img src={item.src} />
                              }
                              <Icon type="github" />
                            </div>
                            <div className="item-content">
                              {
                                item.isSelf ? null :
                                  (<p className="title">
                                    <span className="name">{item.name}</span>
                                    <span className="time">{item.time}</span>
                                  </p>)
                              }

                              <div className="content">
                                <div className="arrow">
                                  <i />
                                  <em />
                                </div>
                                {item.content}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }

                  </div>

                  <div className="im-b">
                    <div className="box">
                      <div className="tool">
                        <span className="tool-l">
                          <span className="tools tools-face" title="表情">
                            <Dropdown overlay={this._initEmoji()} placement="topLeft" trigger={['click']}>
                              <Icon type="smile-o" />
                            </Dropdown>
                          </span>
                          <span className="tools tools-img" title="发送图片"><Icon type="picture" /></span>
                          <span className="tools tools-clear" title="清空聊天记录">
                            <Icon type="minus-circle-o" onClick={() => this.handleClear()} />
                          </span>
                        </span>
                      </div>
                      <div className="msg-box">
                        <FormItem>
                          {
                            getFieldDecorator('msg', {
                              rules: [
                                { required: false, message: '请输入要发送的消息' },
                              ],
                            })(<Input
                              type="textarea"
                              placeholder="在这里输入信息"
                              onKeyUp={e => this.handleEnter(e)}
                            />)
                          }
                        </FormItem>

                      </div>
                      <div className="send-box">
                        <Button
                          type="default"
                          size="default"
                          className="send"
                          onClick={() => this.setState({ showIm: false })}
                        >关闭
                        </Button>
                        <Button
                          type="primary"
                          size="default"
                          className="send"
                          onClick={e => this.handleSubmit(e)}
                        >发送
                        </Button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div> :
            <div className="im-min" id="im-min" onClick={() => this.setState({ showIm: true })}>
              <div className="box">
                <Icon type="mail" /> <span className="des">聊天室</span>
              </div>
            </div>
        }
      </div>
    )
  }
}
