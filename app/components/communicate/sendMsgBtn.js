import React, { Component } from 'react'
import SendMsgModal from './sendMsgModal'

/**
 * 发送短信按钮
 *
 * @param {String} mobile
 */
export default class SendMsgBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sendMsgVisible: false,
    }

    this.handleClickSendMsg = this.handleClickSendMsg.bind(this)
    this.closeSendMsgModal = this.closeSendMsgModal.bind(this)
  }

  handleClickSendMsg() {
    this.setState({
      sendMsgVisible: true,
    })
  }

  closeSendMsgModal() {
    this.setState({ sendMsgVisible: false })
  }

  render() {
    const mobile = this.props.mobile

    return (
      <span>
        <span className={mobile ? 'dwd-sendMsm' : 'hidden'} onClick={this.handleClickSendMsg} />
        <SendMsgModal visible={this.state.sendMsgVisible} close={this.closeSendMsgModal} mobile={mobile} />
      </span>
    )
  }
}
