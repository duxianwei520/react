import React, { Component } from 'react'
import { Popover, Button, Input, Select, message } from 'antd'
import SearchChosen from '../../components/searchChosen'

// 弹窗编辑text,select
// props: type: "text"||"select", value: 初始值, conform: 完成后的回调, checking: 正则表达式
//   eg:<EditInfo type="text" value={riderInfo.mobile}
//   conform={this.changeMobile}
//    checking={(/^1[3|4|5|7|8][0-9]{9}$/)} />

export default class EditInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false, value: '',
    }
    this.handleVisibleChange = this.handleVisibleChange.bind(this)
    this.hide = this.hide.bind(this)
    this._changeInput = this._changeInput.bind(this)
    this.handleOk = this.handleOk.bind(this)
    this._ChangeSelect = this._ChangeSelect.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }
  hide() {
    this.setState({ visible: false })
  }
  handleVisibleChange(visible) {
    this.setState({ visible })
  }
  _changeInput(e) {
    this.setState({ value: e.target.value })
  }
  _ChangeSelect(data) {
    this.props.conform(data)
    this.setState({ visible: false, value: data })
  }
  handleOk() {
    console.log('this.props.checking', this.props.checking)
    if (this.props.checking && !this.props.checking.test(this.state.value)) {
      message.error('输入有误')
      return
    }

    this.props.conform(this.state.value)
    this.setState({ visible: false })
  }
  content() {
    const { type, option } = this.props
    let content = ''
    switch (type) {
    case 'text' :
      content = (<div>
        <Input type="text" onChange={this._changeInput} value={this.state.value} /><div style={{ marginTop: 10 }}>
          <Button type="primary" size="small" style={{ marginRight: 10 }} onClick={this.handleOk}>确定</Button>
          <Button type="ghost" size="small" onClick={this.hide}>取消</Button>
        </div></div>);
      break;
    case 'select' :
      content = (<div>
        <Select style={{ width: 120 }} onChange={this._ChangeSelect} value={this.state.value}>{option}
        </Select>
      </div>);
      break;
    case 'chosen' : content = (<div><SearchChosen /></div>);
      break;
    default: break;
    }
    return content
  }
  render() {
    const {
            buttonName,
        } = this.props;
    return (
      <Popover placement="right" content={this.content()}
        title={buttonName || '编辑'} trigger="click"
        visible={this.state.visible} onVisibleChange={this.handleVisibleChange}
      >
        <Button type="primary" size="small">{buttonName || '编辑'}</Button>
      </Popover>
    )
  }
}
