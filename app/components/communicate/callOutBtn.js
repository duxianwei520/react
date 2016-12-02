import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCallOut } from 'actions/common'

/**
 * 拨打电话按钮
 *
 * @param {String|Number} mobile
 * @param {String|Number} id
 * @param {String} userType
 *          - 'shop'
 *          - 'user'
 *          - 'rider'
 */
@connect(
  (state) => ({
    config: state.config,
  })
)
export default class CallOutBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.handleDiaOut = this.handleDiaOut.bind(this)
  }

  handleDiaOut() {
    const { config, id, mobile, userType } = this.props
    let callUserType = -1
    if (userType === 'user') {
      callUserType = 0
    } else if (userType === 'shop') {
      callUserType = 1
    } else if (userType === 'rider') {
      callUserType = 2
    }
    this.props.dispatch(fetchCallOut({
      mobile: mobile,
      isfromDetailPage: true,
      callUserType: config.CALL_USER_TYPE[callUserType].code,
      entityId: id,
    }))
  }

  render() {
    const mobile = this.props.mobile

    return (
      <span className={mobile ? 'dwd-callphone' : 'hidden'} onClick={this.handleDiaOut} />
    )
  }
}
