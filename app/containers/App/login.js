
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
import { Spin, message, Form, Icon, Input, Button, Row, Col } from 'antd'
import { fetchLogin } from 'actions/common'
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

  componentWillReceiveProps(nextProps){
    const self = this
    if(this.props.loginResponse != nextProps.loginResponse){
      this.setState({loading: false})
      if(nextProps.loginResponse.data && nextProps.loginResponse.data.status == 1){
        const query = this.props.form.getFieldsValue()
        Object.keys(query).map((key) => {
          query[key] === undefined && delete (query[key])
        })
        sessionStorage.setItem('usercode', query.usercode)
        sessionStorage.setItem('userpwd', query.userpwd)
        sessionStorage.setItem('token', nextProps.loginResponse.data.data.token)
        hashHistory.push('/')
      }
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      // debugger
      if(!err){
        this.setState({loading: true})
        this.props.dispatch(fetchLogin(values))
      }
    })
  }

  handleChange(e){
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchLogin({ currentPage: 1 }))
  }

  checkName(rule, value, callback){
    const { validateFields } = this.props.form
    if(value){
      // validateFields([''])
    }
    callback()
  }

  checkPass(rule, value, callback){
    const { validateFields } = this.props.form
    if(value){
      // validateFields([''])
    }
    callback()
  }

  noop(){
    return false
  }

  render() {
    const { loginResponse } = this.props.loginResponse
    const { getFieldDecorator } = this.props.form
    /*const usercode = getFieldDecorator('usercode', {
      rules: [
        { required: true, message: '请填写用户名'},
        { validator: this.checkName},
      ],
    })
    const userpwd = getFieldDecorator('userpwd', {
      rules: [
        { required: true,  message: '请填写密码'},
        { validator: this.checkPass},
      ],
    })*/
    return (
      <div className="login">
          <div className="sy_top"></div>
          <div className="btmLogin">
            <div className="sy_bottom">
              <h1 id="PerformName">login</h1>
              <Row className="ul-wrap">
                <Col span={12} offset={6}>
                  <Spin spinning={this.state.loading}>
                    <Form inline onSubmit={this.handleSubmit}>
                      <FormItem hasFeedback>
                        {getFieldDecorator('usercode', {
                          rules: [
                            { required: true, min:2, message: '用户名至少为2个字符'},
                            { validator: this.checkName}
                          ]
                        })(
                          <Input 
                            addonBefore={<Icon type="user" />} 
                            placeholder="请输入用户名" 
                            type="text" 
                          />
                        )}
                      </FormItem>
                      <FormItem hasFeedback>
                        {getFieldDecorator('userpwd', {
                          rules: [{ required: true, message: '请输入密码'}]
                        })(
                          <Input 
                            addonBefore={<Icon type="lock" />}
                            placeholder="请输入密码"
                            type="password"
                          />
                        )}
                        
                      </FormItem>
                      <FormItem>
                        <Button type="primary" htmlType="submit">登录</Button>
                      </FormItem>
                    </Form>
                  </Spin>
                </Col>
              </Row>
            </div> 
          </div>
        <div id="companyName" className="companyName"></div>
      </div>
    )
  }
}
