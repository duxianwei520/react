import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchLock, fetchUnLock } from 'actions/common'
import { Modal, Form } from 'antd'
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux'

const createForm = Form.create

@connect(
  (state) => ({
    config: state.config,
  }),
  (dispatch) => ({ actions: bindActionCreators(routerActions, dispatch), dispatch: dispatch })
)
@createForm()
export default class LockModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

    this.handleVerifyBackOk = this.handleVerifyBackOk.bind(this)
    this.handleVerifyBackCancel = this.handleVerifyBackCancel.bind(this)
    this.onLock = this.onLock.bind(this)
    this.onUnlock = this.onUnlock.bind(this)
  }

  handleVerifyBackOk() {
    const { lockType, cityId, id } = this.props
    const params = { targetId: id, cityId: cityId, lockType: lockType };
    this.props.dispatch(fetchUnLock(params, this.onUnlock))
  }

  handleVerifyBackCancel() {
    this.props.close()
  }

  onUnlock() {
    const { lockType, cityId, id } = this.props
    const params = { targetId: id, cityId: cityId, lockType: lockType }
    this.props.dispatch(fetchLock(params, this.onLock))
  }

  onLock(result) {
    const { actions, id, cityId, config, lockType, taskId, type } = this.props
    // 本人锁
    if (result.data.lockSelf) {
      if (taskId) {
        actions.push(`/taskDetail/${taskId}/${id}/${cityId}/${type}`)
      } else if (lockType === config.LOCKTYPE[1].code) {
        actions.push(`/riderDetail/${id}/${cityId}`)
      } else if (lockType === config.LOCKTYPE[0].code) {
        actions.push(`/shopDetail/${id}/${cityId}`)
      }
    }
  }

  render() {
    const { visible, config, lockType, lockerName, lockerCode, id, taskId } = this.props
    let lockMsg
    if (lockType === config.LOCKTYPE[0].code) {
      lockMsg = `商家${id}已被${lockerName}(${lockerCode})锁定！`
    } else if (lockType === config.LOCKTYPE[1].code) {
      lockMsg = `配送员${id}已被${lockerName}(${lockerCode})锁定！`
    } else if (lockType === config.LOCKTYPE[3].code) {
      lockMsg = `任务${taskId}已被${lockerName}(${lockerCode})锁定！`
    }

    return (
      <Modal title="锁定提醒" wrapClassName="vertical-center-modal" visible={visible}
        onOk={this.handleVerifyBackOk}
        onCancel={this.handleVerifyBackCancel}
        okText="解锁"
      >
        <p>{lockMsg}</p>
      </Modal>
    )
  }
}
