import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'
import { routerActions } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { fetchLock } from 'actions/common'
import LockModal from './lockModal'

/**
 * 点击查看商家详情或者配送员详情的按钮
 * 若他人也在查看，则会弹出锁定框。
 *
 * @param {String|Number} id
 * @param {String|Number} cityId
 * @param {String} btnTxt
 * @param {String|Number} lockType
 *      - 商家为config.LOCKTYPE[0].code
 *      - 配送员为config.LOCKTYPE[1].code
 * @param {String|Number} taskId（任务）
 * @param {String|Number} type(任务)
 */
@connect(
  (state) => ({
    config: state.config,
  }),
  (dispatch) => ({ actions: bindActionCreators(routerActions, dispatch), dispatch: dispatch })
)
export default class DetailViewBtn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lockModalVisible: false,
    }

    this.handleViewDetail = this.handleViewDetail.bind(this)
    this.onLock = this.onLock.bind(this)
    this.closeLockModal = this.closeLockModal.bind(this)
  }

  handleViewDetail() {
    const { id, cityId, lockType } = this.props
    const params = { targetId: id, cityId: cityId, lockType: lockType };
    this.props.dispatch(fetchLock(params, this.onLock))
  }

  onLock(result) {
    const { actions, lockType, config, id, cityId, taskId, type } = this.props
    // 本人锁
    if (result.data.lockSelf) {
      if (taskId) {
        actions.push(`/taskDetail/${taskId}/${id}/${cityId}/${type}`)
      } else if (lockType === config.LOCKTYPE[1].code) {
        actions.push(`/riderDetail/${id}/${cityId}`)
      } else if (lockType === config.LOCKTYPE[0].code) {
        actions.push(`/shopDetail/${id}/${cityId}`)
      }
    } else {
      this.setState({
        lockerName: result.data.lockerName,
        lockerCode: result.data.lockerCode,
        lockModalVisible: true,
      })
    }
  }

  closeLockModal() {
    this.setState({ lockModalVisible: false })
  }

  render() {
    const { id, lockType, config, taskId, type, cityId } = this.props
    let btnTxt = this.props.btnTxt
    if (!btnTxt) {
      btnTxt = lockType === config.LOCKTYPE[1].code ? '查看配送员详情' : '查看商家详情'
    }

    return (
      <span>
        <Button type="primary" onClick={this.handleViewDetail}
          className="btn btn-info btn-xs btn-view"
        >{btnTxt}</Button>
        <LockModal visible={this.state.lockModalVisible} close={this.closeLockModal}
          lockType={lockType}
          lockerName={this.state.lockerName}
          lockerCode={this.state.lockerCode}
          id={id}
          taskId={taskId}
          type={type}
          cityId={cityId}
        />
      </span>
    )
  }
}
