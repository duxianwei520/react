
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Form, Input, message } from 'antd'
import { regExpConfig } from '@reg'
import Drawer from '@components/draw/draw'
import {
  fetchModuleUpdateDetail,
  fetchModuleAdd,
} from '@apis/manage'

const FormItem = Form.Item

// 连接公用常量、后端返回的数据方法  并放置在props里面调用
// @connect((state, props) => ({
//   config: state.config,
// }))

@Form.create({})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      // isFirst: this.props.isFirst,
    }
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.form.resetFields()
  }

  upDateValue = () => {
    if (this.props.pid) {
      this.props.form.setFieldsValue({
        parentid: this.props.pid,
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      values.resType = 1
      this.setState({ loading: true })
      if (this.props.type === 'modify') {
        fetchModuleUpdateDetail({ ...values, id: this.props.itemId }, (result) => {
          message.success(result.msg)
          this.setState({ loading: false }, () => {
            this.props.handleOk()
          })
          // this.props.form.resetFields()
        })
      } else {
        fetchModuleAdd(values, (result) => {
          message.success(result.msg)
          this.setState({ loading: false }, () => {
            this.props.handleOk()
          })
          // this.props.form.resetFields()
        })
      }
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
    const { getFieldDecorator } = this.props.form;
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
          <Form layout="horizontal" autoComplete="off" onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="上级菜单id" hasFeedback>
              {getFieldDecorator('parentId', {
                initialValue: this.props.pid || '',
              })(<Input disabled />)}
            </FormItem>
            <FormItem {...formItemLayout} label="新增菜单名称" hasFeedback>
              {getFieldDecorator('resName', {
                rules: [
                  { required: true, message: '请输入菜单名称' },
                ],
                initialValue: this.props.values.resName || '',
              })(<Input placeholder="请输入菜单名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="排序数字" hasFeedback>
              {getFieldDecorator('sort', {
                rules: [
                  { required: true, message: '请输入排序数字' },
                  { pattern: regExpConfig.num, message: '请输入数字' },
                ],
                initialValue: `${this.props.values.sort || '0'}`,
              })(<Input placeholder="请输入菜单的排序数字" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="模块名称" hasFeedback>
              {getFieldDecorator('resModule', {
                rules: [
                  { required: true, message: '请输入模块名称' },
                ],
                initialValue: this.props.values.resModule || '',
              })(<Input placeholder="请输入模块名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="关键字" hasFeedback>
              {getFieldDecorator('resKey', {
                rules: [
                  { required: true, message: '请输入关键字' },
                ],
                initialValue: `${this.props.values.resKey || ''}`,
              })(<Input placeholder="请输入关键字" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="图标名称" hasFeedback>
              {getFieldDecorator('resIcon', {
                rules: [
                  {
                    required: true, message: '请输入图标名称',
                  },
                  { pattern: regExpConfig.isNumAlpha, message: '图标名称格式不正确' },
                ],
                initialValue: `${this.props.values.resIcon || ''}`,
              })(<Input placeholder="请输入图标名称" />)}
            </FormItem>
            {/* <FormItem {...formItemLayout} label="类型" hasFeedback>
              {getFieldDecorator('resType', {
                rules: [
                  { required: true, message: '请选择类型' },
                ],
                initialValue: `${this.props.values.resType || ''}`,
              })(
                <Select placeholder="请选择类型" size="large">
                  <Option value="1">菜单</Option>
                  <Option value="2">操作地址</Option>
                  <Option value="3">页面按钮</Option>
                </Select>
              )}
            </FormItem> */}
          </Form>
        </div>
      </Drawer>
    )
  }
}
