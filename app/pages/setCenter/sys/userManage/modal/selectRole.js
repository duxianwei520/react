
import React, { Component } from 'react'
import { Radio, Button, Modal, message } from 'antd'
import { fetchUserSetRole } from '@apis/manage'

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export default class roleSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      checkedValues: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    this.setState({ checkedValues: this.props.values.roleid })
  }

  componentDidMount() {

  }

  onChange(e) {
    this.setState({ checkedValues: e.target.value })
  }

  handleSubmit() {
    this.setState({ loading: true })
    this.props.dispatch(fetchUserSetRole({
      roleid: this.state.checkedValues,
      id: this.props.currPeopleId,
    }, (res) => {
      message.success(res.msg)
      this.setState({ loading: false })
      this.props.handleOkRole()
    }))
  }

  footer() {
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit} loading={this.state.loading}>确定</Button>
        <Button onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const { select, values, visible, onCancel } = this.props
    const selectNodes = select.map((item, index) =>
      <RadioButton value={item.id} key={index}>{item.name} </RadioButton>)
    return (
      <Modal
        visible={visible}
        title="修改角色类别"
        onCancel={onCancel}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <div className="RadioGroup-jxy">
          <RadioGroup onChange={this.onChange} defaultValue={values.roleid}>
            {selectNodes}
          </RadioGroup>
        </div>
      </Modal>
    )
  }
}
