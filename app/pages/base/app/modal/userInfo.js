import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Input, message } from 'antd'
import { regExpConfig } from '@configs/regular.config'
import Drawer from '@components/draw/draw'
import md5 from 'md5'
import { updatePwd } from '@apis/common' // 修改密码api
import '@styles/personalCenter.less'

const FormItem = Form.Item
@connect((state, props) => ({
  config: state.config,

}))
@Form.create({
  onFieldsChange(props, items) {
    // console.log(props)
    // console.log(items)
    // props.cacheSearch(items);
  },
})

export default class userInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pswFlag: false, // 修改按钮框隐藏
      submitLoading: false, // 修改密码提交loading
    }
    // this.checkOldPassword = this.checkOldPassword.bind(this)
    this.checkNewPassword = this.checkNewPassword.bind(this)
    // this.checkRepeatPassword = this.checkRepeatPassword.bind(this)
  }
  // 修改密码 确认原先密码
  // checkOldPassword(rule, value, callback) {
  //   const oldPwd = JSON.parse(sessionStorage.getItem('userinfo')).password
  //   const form = this.props.form
  //   if (value && value !== oldPwd) {
  //     callback('请输入正确密码')
  //   } else {
  //     callback()
  //   }
  // }
  // 原密码新密码是否重复
  // checkRepeatPassword(rule, value, callback) {
  //   const form = this.props.form
  //   console.info(value, 'than', form.getFieldValue('oldPass'))
  //   if (value && value === form.getFieldValue('oldPass')) {
  //     callback('原始密码和修改密码不能一致')
  //   } else {
  //     callback()
  //   }
  // }
  // 修改密码 确认新密码
  checkNewPassword(rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致')
    } else {
      callback()
    }
  }
  // 修改密码后提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        console.log('Received values of form: ', values);
        return
      }
      this.setState({ submitLoading: true })
      let p = md5(values.password)
      let o = md5(values.oldPass)

      // if (process.env.NODE_ENV === 'production') {
      //   p = values.password
      //   o = values.oldPass
      // } else {
      p = md5(values.password)
      o = md5(values.oldPass)
      // }
      updatePwd(
        {
          password: p,
          oldPassword: o,
        }, (res) => {
          message.info(res.msg)
          this.setState({ submitLoading: false })
        },
        (res) => {
          message.error(res.msg)
          this.setState({ submitLoading: false })
        },
      )
    })
  }

  // Drawer-底部按钮信息
  footer() {
    return (
      <div>
        <div className="gout-btn"><Button type="primary" onClick={this.props.handleLogout}>退出</Button></div>
      </div>
    )
  }
  render() {
    const userinfo = JSON.parse(sessionStorage.getItem('userinfo'))
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 16 },
    };
    let roles = ''
    userinfo && userinfo.roles.map((item, index) => {
      roles += `${item.roleName}，`
    })
    roles = roles.substring(0, roles.length - 1)
    return (
      <Drawer
        visible
        className="drawer-sm"
        title="用户信息"
        onCancel={this.props.onCancel}
        footer={this.footer()}
      >
        <div className="user">
          <div className="user-img"><img src="" alt="" /></div>
          <div className="user-info">
            <ul>
              <li><span>姓名</span><b>{userinfo.chineseName}</b></li>
              <li><span>手机号</span><b>{userinfo.phoneNo}</b></li>
              <li><span>短号</span><b>{userinfo.shortPhoneNo}</b></li>
              <li><span>单位</span><b>{userinfo.deptName}</b></li>
              <li><span>职务</span><b>{userinfo.post}</b></li>
              <li><span>用户角色</span><b>{roles}</b></li>
              <li className="changePsw_in"><span>修改密码</span><i className="enter" onClick={() => this.setState({ pswFlag: true })}>修改</i></li>
              {this.state.pswFlag ?
                <div className="changePswWrap">
                  <div className="changePsw">
                    <div className="changePsw_title">修改密码</div>
                    <Form layout="horizontal" onSubmit={this.handleSubmit}>
                      <FormItem {...formItemLayout} label="原密码" hasFeedback>
                        {getFieldDecorator('oldPass', {
                          initialValue: '',
                          rules: [{ required: true, message: '请输入原密码' },
                            { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
                          ],
                        })(<Input placeholder="请输入原密码" type="password" />)}
                      </FormItem>
                      <FormItem {...formItemLayout} label="新密码" hasFeedback>
                        {getFieldDecorator('password', {
                          initialValue: '',
                          rules: [{ required: true, message: '请输入新密码' },
                            { pattern: regExpConfig.pwd, message: '密码由6-16位数字或者字母组成' },
                            { validator: this.checkRepeatPassword },
                          ],
                        })(<Input placeholder="请输入新密码" type="password" />)}
                      </FormItem>
                      <FormItem {...formItemLayout} label="确认新密码" hasFeedback>
                        {getFieldDecorator('checkPass', {
                          initialValue: '',
                          rules: [{ required: true, message: '确认新密码' },
                            { validator: this.checkNewPassword },
                          ],
                        })(<Input placeholder="确认新密码" type="password" />)}
                      </FormItem>
                      <div className="changePsw_btngroup">
                        <Button type="primary" htmlType="submit" loading={this.state.submitLoading}>确定</Button>
                        <Button type="defalut" htmlType="reset" onClick={() => this.setState({ pswFlag: false })}>取消</Button>
                      </div>
                    </Form>
                  </div>
                </div>
                : ''}
            </ul>
          </div>
        </div>
      </Drawer>
    )
  }
}
