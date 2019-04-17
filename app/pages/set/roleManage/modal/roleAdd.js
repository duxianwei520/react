

import React, { Component } from 'react'
import { Button, Form, Input, /* Modal, */ Select, message } from 'antd'
import { regExpConfig } from '@reg'
import Drawer from '@components/draw/draw'
import {
  fetchRoleAdd,
  fetchRoleUpdate,
} from '@apis/manage'

const FormItem = Form.Item
const { Option } = Select


@Form.create({})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.form.resetFields()
    this.props.form.setFieldsValue({
      roleName: this.props.value.roleName,
      sort: `${this.props.value.sort}`,
      tjFlag: this.props.value.tjFlag !== undefined ? String(this.props.value.tjFlag) : '1',
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({ loading: true })
      if (this.props.type === 'modify') {
        fetchRoleUpdate({ ...values, id: this.props.modifyId }, (res) => {
          message.success(res.msg)
          this.props.handleOk(false)
        })
      } else {
        fetchRoleAdd(values, (res) => {
          message.success(res.msg)
          this.props.handleOk(false)
        })
      }
      this.setState({ loading: false })
    });
  }

  footer() {
    const { loading } = this.state
    return (
      <div>
        <Button type="primary" onClick={this.handleSubmit} loading={loading}>确定</Button>
        <Button onClick={this.props.onCancel}>取消</Button>
      </div>
    )
  }

  render() {
    const {
      visible, onCancel, title,
    } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    }
    return (
      <Drawer
        visible={visible}
        title={title}
        onCancel={onCancel}
        footer={this.footer()}
        className="modal-header modal-body"
      >
        <div className="modalcontent">
          <Form layout="horizontal" onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="角色名称" hasFeedback>
              {getFieldDecorator('roleName', {
                rules: [
                  { required: true, message: '请输入角色名称' },
                  // { pattern: regExpConfig.isNormalEncode, message: '请输入非特殊字符' },
                ],
              })(<Input placeholder="请输入角色名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="角色排序" hasFeedback>
              {getFieldDecorator('sort', {
                rules: [
                  { required: true, message: '请输入排序数字' },
                  { pattern: regExpConfig.num, message: '请输入数字' },
                ],
              })(<Input placeholder="请输入角色排序" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="是否统计" hasFeedback>
              {getFieldDecorator('tjFlag', {
                initialValue: '1',
                rules: [
                  { required: true, message: '请选择是否统计' },
                ],
              })(<Select placeholder="选择是否统计">
                <Option value="0">否</Option>
                <Option value="1">是</Option>
              </Select>)}
            </FormItem>
            <Button className="hide" type="primary" htmlType="submit">确定</Button>
          </Form>
        </div>
      </Drawer>
    )
  }
}

