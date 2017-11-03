import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Menu, Dropdown, Button, Modal, message } from 'antd'

const confirm = Modal.confirm

@connect(
  (state, props) => ({ config: state.config })
)
export default class Header extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
      staff: {
        onlineCount: '',
        monthCount: '',
        usertable: {
          gxdwqc: '',
          longmobile: '',
          post: '',
          shortmobile: '',
          username: '',
          userid: '',
        },
      },
    }
    this.handleLogout = this.handleLogout.bind(this)
  }

  // 登出
  handleLogout() {
    const { config } = this.props
    const self = this
    confirm({
      title: '提示',
      content: '确认退出登录吗？',
      onOk() {
        // self.props.dispatch(fetchLogout({}, (result) => {
        //   // console.log(result)
        //   if (result.status == 1) {
        //     config.staff = {}
        //     hashHistory.push('/login')
        //   } else {
        //     message.error(result.msg)
        //   }
        // }))
        hashHistory.push('/login')
      },
    })
  }
  render() {
    const staff = this.state.staff
    const menu = (
      <Menu className="nav-dropmenu">
        <Menu.Item key="0">
          <span className="label">所属单位</span><span>{staff.usertable.gxdwqc}</span>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="1">
          <span className="label">用户姓名</span><span>{staff.usertable.username}</span>
        </Menu.Item>
        <Menu.Item key="5">
          <Button type="primary" size="small" onClick={this.handleLogout}>退出登录</Button>
        </Menu.Item>
      </Menu>
    )
    const username = sessionStorage.getItem('username')
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <div className="navbar-header">
            <Link to={'/'} className="navbar-brand">
              <div className="brand-title">
                <span className="brand-text">肚皮</span>
              </div>
            </Link>
          </div>

          <div className="navbar-content clearfix">
            <ul className="nav navbar-top-links pull-right">
              <li className="login-info">
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link">{username || '肚皮叔'}</a>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}
