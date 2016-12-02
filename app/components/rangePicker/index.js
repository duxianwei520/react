/*
start=起始时间
end=结束时间
startKey=起时值的key
endKey=结束值的key
onFieldsChange 用于双向绑定
*/

import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { fetchShopList, fetchStaffList, fetchRiderList }
// from 'actions/common'
import { DatePicker } from 'antd'
import moment from 'moment'

const RangePicker = DatePicker.RangePicker

export default class rangePicker extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(value, dateString) {
    this.props.onFieldsChange({
      [this.props.startKey]: dateString[0],
      [this.props.endKey]: dateString[1],
    })
  }

  render() {
    const start = this.props.start && moment(this.props.start, 'YYYY-MM-DD').format()
    const end = this.props.end && moment(this.props.end, 'YYYY-MM-DD').format()
    const value = start && [start, end]
    return (
      <RangePicker value={value} onChange={this.onChange} />
    );
  }
}
