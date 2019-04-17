
import React, { Component } from 'react'
import { Button, Form, Input, message, Select } from 'antd'
import { regExpConfig } from '@reg'
import Drawer from '@components/draw/draw'
import {
  fetchUserDetailUpdate,
  fetchUserAdd,
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

  // 组件已经加载到dom中
  componentDidMount() {
    this.props.form.resetFields()
  }


  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.setState({ loading: true }, () => {
        if (this.props.type === 'edit') {
          fetchUserDetailUpdate({ ...values, deptCode: this.props.deptId, id: this.props.currPeopleId }, (res) => {
            message.success(res.msg)
            this.state.loading = false
            this.props.handleOk()
          }, (errorRes) => {
            message.warning(errorRes.msg)
            this.setState({ loading: false })
          })
        } else {
          fetchUserAdd({ ...values, deptCode: this.props.deptId }, (res) => {
            message.success(res.msg)
            this.state.loading = false
            this.props.handleOk()
          }, (errorRes) => {
            message.warning(errorRes.msg)
            this.setState({ loading: false })
          })
        }
      })
    })
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
    const {
      visible, onCancel, title, roleList, values,
    } = this.props
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    (values.roleIds || []).map((item, index) => (values.roleIds.splice(index, 1, String(item))));
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
            <FormItem {...formItemLayout} label="名称" hasFeedback>
              {getFieldDecorator('chineseName', {
                initialValue: values.chineseName || '',
                rules: [{ required: true, message: '请输入名称' }],
              })(<Input placeholder="请输入名称" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="身份证" hasFeedback>
              {getFieldDecorator('idcardNo', {
                initialValue: values.idcardNo || '',
                rules: [
                  { required: true, message: '请输入身份证号' },
                  { pattern: regExpConfig.IDcard, message: '身份证号格式不正确' },
                ],
              })(<Input placeholder="请输入身份证号" disabled={this.props.type === 'edit'} />)}
            </FormItem>
            <FormItem {...formItemLayout} label="警号" hasFeedback>
              {getFieldDecorator('policeCode', {
                initialValue: values.policeCode || '',
                rules: [
                  // { required: true, message: '请输入警号' },
                  // { pattern: regExpConfig.policeNo, message: '请输入4-10位数字或字母' },
                ],
              })(<Input placeholder="请输入警号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="登陆用户名" hasFeedback>
              {getFieldDecorator('username', {
                initialValue: values.username || '',
                rules: [
                  { required: true, message: '请输入4-10位数字或字母' },
                  { pattern: regExpConfig.policeNo, message: '请输入4-10位数字或字母' },
                ],
              })(<Input placeholder="请输入登陆用户名" disabled={this.props.type === 'edit'} />)}
            </FormItem>
            <FormItem style={{ position: 'absolute', zIndex: -10 }} ><input type="password" /></FormItem>
            {
              this.props.type === 'edit' ? (
                <FormItem {...formItemLayout} label="修改密码">
                  {getFieldDecorator('password', {
                    initialValue: values.password || '',
                    rules: [{ pattern: regExpConfig.pwd, message: '请输入6-16位数字或者字母' }],
                  })(<Input type="password" placeholder="不改密码此项为空" />)}
                </FormItem>
              ) : (
                <FormItem {...formItemLayout} label="登陆密码" hasFeedback>
                  {getFieldDecorator('password', {
                    initialValue: values.password || '',
                    rules: [
                      { required: true, message: '密码请输入6-16位数字或者字母' },
                      { pattern: regExpConfig.pwd, message: '密码请输入6-16位数字或者字母' },
                    ],
                  })(<Input placeholder="请输入密码" type="password" />)}
                </FormItem>
              )
            }
            <FormItem {...formItemLayout} label="手机号码" hasFeedback>
              {getFieldDecorator('phoneNo', {
                initialValue: values.phoneNo || '',
                rules: [
                  { required: true, message: '请输入手机号码' },
                  { pattern: regExpConfig.mobile, message: '手机号码格式不正确' },
                ],
              })(<Input placeholder="请输入手机号码" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="手机短号" hasFeedback>
              {getFieldDecorator('shortPhoneNo', {
                initialValue: values.shortPhoneNo || '',
              })(<Input placeholder="请输入手机短号" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="职务" hasFeedback>
              {getFieldDecorator('post', {
                initialValue: values.post || '',
              })(<Input placeholder="请输入职务" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="角色" hasFeedback>
              {getFieldDecorator('roleIds', {
                initialValue: values.roleIds || [],
                rules: [
                  { required: true, message: '请选择用户的角色' },
                ],
              })(<Select
                mode="multiple"
                placeholder="请选择用户的角色"
                showSearch
              >
                {
                  roleList.map(item => <Option key={item.roleName} value={`${item.id}`}>{item.roleName}</Option>)
                }
              </Select>)}
            </FormItem>
            <Button className="hide" type="primary" htmlType="submit">确定</Button>
          </Form>
        </div>
      </Drawer>
    )
  }
}
