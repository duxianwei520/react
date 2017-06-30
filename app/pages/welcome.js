/*
 * @Author: dupi
 * @Date: 2017-06-27 13:51:09
 * @Last Modified by: dupi
 * @Last Modified time: 2017-06-27 15:09:38
 */


import React, { Component } from 'react'
import { connect } from 'react-redux'


@connect(
    (state, props) => ({
      config: state.config,
    })
)
export default class welcome extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      data: {},
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {

  }

  render() {
    return (
      <div className="welcome">
        <div className="content">
          <h2 className="title">肚皮叔：行，我等你</h2>
        </div>
      </div>
    )
  }
}
