
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Menu, Button, Modal, message, Icon, Row, Col } from 'antd'
import { brandName } from '@config'
import { logout } from '@apis/common'
// import User from '@images/user.png'

import EditPassword from './modal/editPassword'
import UserInfo from './modal/userInfo'


const { confirm } = Modal

@connect((state, props) => ({
  config: state.config,
  staffResponse: state.staffResponse,
}))
export default class Header extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      userInfo: false, // 控制用户信息弹框显隐
      editPasswordMadalIsOpen: false,
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {

  }

  // 登出
  handleLogout() {
    const { config } = this.props
    const self = this
    confirm({
      title: '提示',
      content: '确认退出登录吗？',
      onOk() {
        logout({}, (result) => {
          // console.log(result)
          if (result.status === 1) {
            sessionStorage.clear()
            config.staff = {}
            hashHistory.push('/login')
          } else {
            message.warning(result.msg)
          }
        })
      },
    })
  }

  // 取消修改密码弹窗
  cancel = () => {
    this.setState({ editPasswordMadalIsOpen: false })
  }

  // 确认修改密码弹窗
  handleOk = () => {
    this.setState({ editPasswordMadalIsOpen: false })
  }

  // 修改密码弹窗显示
  editPasswordOpen = () => {
    this.setState({ editPasswordMadalIsOpen: true })
  }

  // 点击显示用户信息
  getUserInfo() {
    this.setState({ userInfo: true })
  }

  // 点击关闭用户信息弹窗
  onCancel() {
    this.setState({ userInfo: false })
  }

  logoClick = () => {
    // const nav = JSON.parse(sessionStorage.getItem('gMenuList'))
    // if (nav[0] && nav[0].children && nav[0].children[0].children && nav[0].children[0].children[0] && nav[0].children[0].children[0].resKey) {
    //   hashHistory.push(nav[0].children[0].children[0].resKey)
    //   sessionStorage.setItem('topMenuReskey', nav[0].resKey)
    // }
    // if (nav[0] && nav[0].children && nav[0].children[0].resKey) {
    //   hashHistory.push(nav[0].children[0].resKey)
    // } else {
    //   hashHistory.push('/')
    // }
    // console.log(nav)
    // hashHistory.push()
  }

  render() {
    const userinfo = JSON.parse(sessionStorage.getItem('userinfo')) || {}
    const roles = []
    userinfo && userinfo.roles && userinfo.roles.map((item) => {
      roles.push(item.roleName)
    })
    let name = ''
    if (sessionStorage.getItem('userinfo')) {
      name = JSON.parse(sessionStorage.getItem('userinfo')).chineseName
    }
    // console.log(JSON.parse(sessionStorage.getItem('userinfo')))
    const userCenter = (
      <Menu className="nav-dropmenu">
        <Menu.Item key="1">
          <Icon type="caret-up" />
          <span className="label">角色： </span><span className="value" title={roles.join(',')}>{roles.join(',') || '---'}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <span className="label">警号： </span><span className="value">{userinfo.policeCode || '---'}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <span className="label">职务： </span><span className="value">{userinfo.duty || '---'}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <Row>
            <Col span={12}>
              <Button type="primary" size="small" onClick={this.editPasswordOpen}>修改密码</Button>
            </Col>
            <Col span={12}>
              <Button type="primary" size="small" onClick={this.handleLogout}>退出登录</Button>
            </Col>
          </Row>
        </Menu.Item>
      </Menu>
    )
    const { gMenuList, topMenuReskey } = this.props
    const topKey = topMenuReskey
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <Row className="row">
            <Col span={20}>
              <div className="navbar-brand" title={brandName} onClick={this.logoClick}>
                <span className="brand-title">
                  <span className="brand-text"><span className="logo" />{brandName}</span>
                </span>
              </div>
              <nav className="topMenus hide">
                {
                  gMenuList && gMenuList.map((item, index) => (<span
                    className={item.resKey === topKey ? 'topMenu on' : 'topMenu'}
                    key={index}
                    onClick={() => this.props.topMenuClick(item, index)}
                  >{item.resName}</span>))
                }
              </nav>
            </Col>
            <Col span={4} className="col">
              <div className="right">
                <ul>
                  <li>
                    <a onClick={() => this.getUserInfo()}>{name}</a>
                  </li>
                  <li>
                    <a onClick={this.handleLogout}>退出</a>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </div>
        {
          this.state.editPasswordMadalIsOpen ?
            <EditPassword
              handleOk={this.handleOk}
              visible={this.state.editPasswordMadalIsOpen}
              onCancel={this.cancel}
            />
            : null
        }

        {
          this.state.userInfo ?
            <UserInfo
              onCancel={() => this.onCancel()}
              handleLogout={this.handleLogout}
            /> : null
        }
      </header>
    )
  }
}
