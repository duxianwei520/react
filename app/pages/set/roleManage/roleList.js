
import React, { Component } from 'react'
import { Icon, Popconfirm } from 'antd'

export default class app extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentId: '',
    }
  }

  componentWillMount() {
    if (this.props.roles.length > 0) {
      this.setState({
        currentId: this.props.roles[0].id || 0,
      })
    }
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.state.currentId === '' && nextProps.roles.length > 0) {
      this.setState({
        currentId: nextProps.roles[0].id || 0,
      })
    }
  }

  // #region 收缩业务代码功能

  // 角色名点击
  roleNameClick = (roleid, roleType) => {
    this.setState({ currentId: roleid })
    this.props.onCurrentIndex(roleid, roleType)
  }

  // 改变选中li的样式
  checkTitleId = id =>
    // console.log(id)
    (id === this.state.currentId ? 'active cell-layout' : 'cell-layout')


  // 角色修改
  roleModify = (info) => {
    this.props.onRoleModify(info)
  }

  // 角色删除
  onDelete = (info) => {
    this.state.currentId = ''
    this.props.handleRoleDelete(info)
  }

  // render roleNodes
  renderRoleNodes = () => {
    const { roles, btnRights } = this.props
    return roles.map((item, index) =>
      (<li key={index} className={this.checkTitleId(item.id)}>
        <a className="name" onClick={() => this.roleNameClick(item.id, item.type)}>{item.roleName}</a>
        <a className="icons">
          {
            btnRights.edit ?
              <Icon title="修改角色" type="edit" onClick={() => this.roleModify(item.id)} /> : null
          }
          {
            btnRights.deleteRole ?
              <Popconfirm title="删除?" onConfirm={() => this.onDelete(item.id)}>
                <Icon title="删除角色" className="iconMargin" type="minus-circle-o" />
              </Popconfirm>
              : null
          }
        </a>
      </li>))
  }

  // #endregion

  render() {
    return (
      <ul className="roleslist">
        {this.renderRoleNodes()}
      </ul>
    )
  }
}
