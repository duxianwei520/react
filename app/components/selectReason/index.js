import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { fetchAllSectionList } from 'actions/common'
import { Input, Icon } from 'antd'

// @connect(
//     (state, props)=>{return {
//         config: state.config,
//         allSectionList: state.allSectionList
//     }}
// )

export default class SelectReason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeType: -1,
      open: false,
      reason: null,
    }
    this._inputClick = this._inputClick.bind(this)
    this.hide = this.hide.bind(this)
    this._handleItemClick = this._handleItemClick.bind(this)
  }
  componentDidMount() {
    document.addEventListener('click', this.hide)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.hide)
  }
    // 是否隐藏下拉框的判断方法
  hide(event) {
    if (event && event.target.id === 'reason') {
      return
    }
    this.setState({
      open: false,
    })
  }
    // 点击通话原因的某个列表
  _handleItemClick(e) {
    const type = e.currentTarget.getAttribute('data-type')
    const reason = e.currentTarget.getAttribute('data-reason')
    this.setState({ activeType: type, reason: reason })
    this.props.onFieldsChange({
      [this.props.id]: type,
      [this.props.text]: reason,
    })
    this.hide()
        // this.props.onReasonChange(type, reason)
  }
    // 点击输入框显示或隐藏下拉框
  _inputClick(e) {
    // const reasonDrop = this.refs.reasonDrop
    this.setState({
      open: !this.state.open,
    })
  }
  _renderReason(reasons) {
    const _self = this
    let radio
    return (
      <ul>
        {
          reasons.map((item, index) => {
            if (!item.sub) {
              radio = (
                <span className={
                  parseInt(_self.state.activeType, 10) ===
                  item.type ? 'form-radio form-normal form-primary active' :
                  'form-radio form-normal form-primary'}
                  data-type={item.type}
                  data-reason={item.name}
                  onClick={_self._handleItemClick}
                >
                  <span />
                </span>
              )
            }
            return (
              <li className="active" key={index}>
                {radio}
                <a>
                  <span>
                    <span>{item.name}</span>
                  </span>
                </a>
                {item.sub && item.sub.length > 0 ? _self._renderReason(item.sub) : ''}
              </li>
            )
          })
        }
      </ul>
    )
  }

  // getValue() {
        /* let type = this.props.value || ''
        // console.log(this.props.keyName)
        console.log(this.props)
        // console.log(this.props.text)
        this.props.options.map(option => {
            if(option.type == type){
                this.setState({
                    activeType: type,
                    reason: option.name
                })
            }
        })
        return type */
       /* let value = "",text = this.props.text
        this.props.options.map(option=>{
            value += option.checked ? `${option[text]},` : ''
        })
        debugger
        return value */
  // }
  render() {
    // const value = this.getValue()
        // console.log(this.state.activeType)
        // console.log(this.props)
        // const { getFieldProps } = this.props.form
    return (
      <span className="reasonWrap">
        <Input id="reason" type="text"
          className="dwd-reasons-dropdown-toggle"
          value={this.state.reason}
          onClick={this._inputClick}
          readOnly="readOnly"
        />
        <Icon type="ross-circle" />
        <div className={this.state.open ? 'dwd-reasons-dropdown open' : 'dwd-reasons-dropdown hidden'}>
            {this._renderReason(this.props.options)}
        </div>
      </span>
    )
  }
}
