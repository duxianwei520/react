import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import { Button } from 'antd'
// import {connect} from 'react-redux'
// import {} from '@actions/xxx'
// import Socket from '@configs/socket'

// @connect((storeState)=>({}))

export default class app extends Component {
  static defaultProps = {
  }

  static propTypes = {
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() { }

  // #region vscode 1.17的收缩代码块功能  业务代码


  // #endregion

  // 发送socket数据
  onClickSend = () => {
    // Socket.send({ type: 'receive/hello3', data: { name: 'dupi' } })
  }

  render() {
    return (
      <div className="page">
        示范页面
        <div>
          <Button onClick={this.onClickSend}>发送</Button>
        </div>
      </div>
    )
  }
}
