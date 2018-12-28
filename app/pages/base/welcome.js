import React, { Component } from 'react'
// import { message } from 'antd'
import { brandName } from '@config'
import '@styles/welcome.less'

export default class welcome extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="welcome">
        <div className="content">
          <div className="title">{brandName}</div>
        </div>
      </div>
    )
  }
}
