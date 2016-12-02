import React, { Component } from 'react'
import { connect } from 'react-redux'
// import CtiContainer from './ctiContainer'

@connect(
  (state, props) => ({ config: state.config })
)
export default class Header extends Component {
  render() {
    const { config } = this.props
    return (
      <header id="navbar">
        <div id="navbar-container" className="boxed">
          <div className="navbar-header">
            <a href="index.html" className="navbar-brand">
              <div className="brand-title">
                <span className="brand-text">肚皮叔</span>
              </div>
            </a>
          </div>

          <div className="navbar-content clearfix">

            <ul className="nav navbar-top-links pull-right">
              <li className="login-info">
                <a>上次登录时间：{config.STAFF.previousLoginTime}</a>
              </li>
              <li className="login-info">
                <a>IP：{config.STAFF.previousLoginIp}</a>
              </li>
              <li className="login-info">
                <a>城市：{config.STAFF.previousLoginCity || '未知'}</a>
              </li>
              <li className="login-info">
                <a>用户名：{config.STAFF.name}</a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    )
  }
}
