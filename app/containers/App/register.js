
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory, Link } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
import { fetchRegister } from 'actions/common'

const FormItem = Form.Item

@connect(
  (state, props) => ({
    config: state.config,
    loginResponse: state.loginResponse,
  })
)
@Form.create({
  onFieldsChange(props, items) {
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class Login extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props)
    this.state = {
      loading: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.checkPass = this.checkPass.bind(this)
    this.checkName = this.checkName.bind(this)
    this.noop = this.noop.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // this.state.loading = true
        // console.log(values)
        // this.setState({loading: true})
        Object.keys(values).map((key) => values[key] = (values[key] && values[key].trim()))
        this.props.dispatch(fetchRegister(values, (res) => {
          // console.log(res)
          message.success(res.msg)
          if (res.status === 1) {
            const query = this.props.form.getFieldsValue()
            global.$GLOBALCONFIG.staff = res.data.user
            // hashHistory.push('/')
          }
        }, (res) => {
          message.warning(res.msg)
          this.setState({
            loading: false,
          })
        }))
        // sessionStorage.setItem('token', 'dupi')
        // sessionStorage.setItem('username', values.username)
        // hashHistory.push('/')
      }
    })
  }

  handleChange(e) {
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchLogin({ currentPage: 1 }))
  }

  checkName(rule, value, callback) {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback()
  }

  checkPass(rule, value, callback) {
    // const { validateFields } = this.props.form
    if (value) {
      // validateFields([''])
    }
    callback()
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  }

  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  noop() {
    return false
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login">
        <div className="sy_top" />
        <div className="btmLogin">
          <div className="sy_bottom">
            <h1 id="PerformName">注册</h1>
            <Row className="ul-wrap">
              <Col span={24}>
                <Spin spinning={this.state.loading}>
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem hasFeedback>
                      {getFieldDecorator('username', {
                        rules: [
                          { required: true, message: '请输入用户名' },
                          { validator: this.checkName },
                          // { pattern: regExpConfig.IDcardTrim, message: '身份证号格式不正确' }
                        ],
                        // validateTrigger: 'onBlur',
                      })(
                        <Input
                          prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                          placeholder="请输入用户名"
                          type="text"
                        />
                        )}
                    </FormItem>
                    <FormItem hasFeedback>
                      {getFieldDecorator('password', {
                        rules: [
                          { required: true, message: '请输入密码' },
                          // { pattern: regExpConfig.pwd, message: '密码只能是6-16个数字或者字母组成' }
                          { validator: this.checkConfirm },
                        ],
                        // validateTrigger: 'onBlur',

                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                          placeholder="请输入密码"
                          type="password"
                          onBlur={this.handleConfirmBlur}
                        />
                        )}
                    </FormItem>
                    <FormItem hasFeedback>
                      {getFieldDecorator('confirm', {
                        rules: [
                          { required: true, message: '请输入密码' },
                          // { pattern: regExpConfig.pwd, message: '密码只能是6-16个数字或者字母组成' }
                          { validator: this.checkPassword },
                        ],
                        // validateTrigger: 'onBlur',

                      })(
                        <Input
                          prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                          placeholder="请再次输入密码"
                          type="password"
                        />
                        )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit">确定注册</Button>
                      <Link to="/login">登录</Link>
                    </FormItem>
                  </Form>
                </Spin>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
