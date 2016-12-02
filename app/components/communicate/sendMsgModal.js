import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSendSms } from 'actions/common'
import { Modal, Form, Input, Select } from 'antd'

const FormItem = Form.Item
const createForm = Form.create
const Option = Select.Option

@connect(
  (state) => ({
    config: state.config,
  })
)
@createForm()
export default class SendMsgModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msgOptions: [],
    }
    this.handleVerifyBackOk = this.handleVerifyBackOk.bind(this)
    this.handleVerifyBackCancel = this.handleVerifyBackCancel.bind(this)
    this.selectParentChange = this.selectParentChange.bind(this)
    this.selectChildChange = this.selectChildChange.bind(this)
  }

  handleVerifyBackOk() {
    const formData = this.props.form.getFieldsValue()
    const { mobile } = this.props
    if (formData.content) {
      this.props.dispatch(fetchSendSms({ mobile: mobile, content: formData.inputContent }))
    }
    this.props.close()
  }

  handleVerifyBackCancel() {
    this.props.close()
  }

  selectParentChange(value) {
    const { config } = this.props
    this.setState({
      msgOptions: config.MESSAGE_TEMPLATE[parseInt(value, 10)].msg,
    })

    // TODO
    this.props.form.setFieldsValue({
      inputContent: '',
      content: '',
    })
  }

  selectChildChange(value) {
    this.props.form.setFieldsValue({ inputContent: value })
  }

  render() {
    const { config, visible } = this.props
    let msgType = config.MESSAGE_TEMPLATE.map(
      (temp, index) => <Option key={temp.type} value={index.toString()}>{temp.type}</Option>
    )
    let msg = this.state.msgOptions.map((op, index) => <Option key={op.title} value={op.content}>{op.title}</Option>)
    const { getFieldProps } = this.props.form

    return (
      <Modal title="发送短信" wrapClassName="vertical-center-modal" visible={visible}
        onOk={this.handleVerifyBackOk}
        onCancel={this.handleVerifyBackCancel}
      >
        <Form horizontal>
          <FormItem>
            <Select style={{ width: '100px' }}
              onChange={this.selectParentChange}
            >
              {msgType}
            </Select>
            <Select style={{ width: '300px', marginLeft: '10px' }}
              onSelect={this.selectChildChange}
              {...getFieldProps('content')} name="content"
            >
              {msg}
            </Select>
          </FormItem>
          <FormItem>
            <Input type="textarea" {...getFieldProps('inputContent')}
              name="inputContent" rows="5" cols="70"
            />
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
