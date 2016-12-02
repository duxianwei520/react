import React, { Component } from 'react'
import { Button, Form, Input, Select, Row, Col } from 'antd'
const Option = Select.Option
const createForm = Form.create
const FormItem = Form.Item
const InputGroup = Input.Group;

function noop() {
  return false;
}

@Form.create({
  onFieldsChange(props, items) {
    console.log(props)
    console.log(items)
    // props.cacheSearch(items);
  },
})

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '鄂尔多斯东胜区纺织街道23号4幢'
    }
    this.handleReset = this.handleReset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.userExists = this.userExists.bind(this)
    this.checkPass = this.checkPass.bind(this)
    this.checkPass2 = this.checkPass2.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleAreaClick = this.handleAreaClick.bind(this)
  }

  handleReset(e) {
    e.preventDefault();
    this.props.form.resetFields();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log('Submit!!!');
      console.log(values);
    });
  }

  userExists(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      setTimeout(() => {
        if (value === 'JasonWood') {
          callback([new Error('抱歉，该用户名已被占用。')]);
        } else {
          callback();
        }
      }, 800);
    }
  }

  checkPass(rule, value, callback) {
    const { validateFields } = this.props.form;
    if (value) {
      validateFields(['rePasswd'], { force: true });
    }
    callback();
  }

  checkPass2(rule, value, callback) {
    const { getFieldValue } = this.props.form;
    if (value && value !== getFieldValue('passwd')) {
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  handleSelectChange(rule, value, callback) {
    console.log(rule)
  }

  handleAreaClick(e){
    console.log(e.target)
  }

  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    // debugger
    const nameProps = getFieldProps('name', {
      rules: [
        { required: true, min: 5, message: '用户名至少为 5 个字符' },
        { validator: this.userExists },
      ],
    })
    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [
          { required: true },
        ],
        trigger: 'onBlur',
      }, {
        rules: [
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        trigger: ['onBlur', 'onChange'],
      }],
    })
    const passwdProps = getFieldProps('passwd', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
        { validator: this.checkPass },
      ],
    })
    const rePasswdProps = getFieldProps('rePasswd', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请再次输入密码',
      }, {
        validator: this.checkPass2,
      }],
    })
    const textareaProps = getFieldProps('textarea', {
      rules: [
        { required: true, message: '真的不打算写点什么吗？' },
      ],
    })
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 20 },
    }
    return (
      <div>
        <Form horizontal >
          <FormItem
            labelCol={{span: 2}}
            wrapperCol={{span: 20}}
            label="用户名"
            hasFeedback
            help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
            <Input {...nameProps} placeholder="实时校验，输入 JasonWood 看看" />
          </FormItem>

          <FormItem {...formItemLayout} label="地址属性">
            <Select 
              id="select" 
              size="large" 
              defaultValue="1" 
              onChange={this.handleSelectChange}
            >
              <Option value="1">标准地址</Option>
              <Option value="2">非标准地址</Option>
              <Option value="3">虚拟地址</Option>
            </Select>
          </FormItem>

          <FormItem  {...formItemLayout} label="管辖单位">
            <Row gutter={16}>
              <Col span="12">
                <Input defaultValue="东胜区分局" readOnly disabled />
              </Col>
              <Col span="12">
                <Input defaultValue="解放路派出所" readOnly disabled />
              </Col>
            </Row>
          </FormItem>

          <FormItem  {...formItemLayout} label="行政区划">
            <Row gutter={16}>
              <Col span="4">
                <Input defaultValue="内蒙古自治区" readOnly disabled />
              </Col>
              <Col span="4">
                <Input defaultValue="鄂尔多斯市" readOnly disabled />
              </Col>
              <Col span="4">
                <Input defaultValue="东胜区" onClick={this.handleAreaClick} name="area" readOnly />
              </Col>
              <Col span="4">
                <Input defaultValue="纺织街道" readOnly />
              </Col>
              <Col span="4">
                <Input defaultValue="曙光社区" readOnly />
              </Col>
            </Row>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback>
            <Input {...emailProps} type="email" placeholder="onBlur 与 onChange 相结合" />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback>
            <Input {...passwdProps} type="password" autoComplete="off"
              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="确认密码"
            hasFeedback>
            <Input {...rePasswdProps} type="password" autoComplete="off" placeholder="两次输入密码保持一致"
              onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="备注">
            <Input {...textareaProps} type="textarea" placeholder="随便写" id="textarea" name="textarea" />
          </FormItem>

          <FormItem wrapperCol={{ span: 12, offset: 7 }}>
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
            &nbsp;&nbsp;&nbsp;
            <Button type="ghost" onClick={this.handleReset}>重置</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
