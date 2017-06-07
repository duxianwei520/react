/*
** creator: dupi  2016-11-10 11:30  创建js
** editor: dupi 2016-02-09 16:00 在头部添加文件修改记录
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
