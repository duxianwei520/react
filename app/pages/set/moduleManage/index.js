import React, { Component } from 'react';
// import { connect } from 'react-redux'
import { Button, Layout, message } from 'antd';
// import { hashHistory } from 'react-router'
import {
  fetchModuleList, // 获取模块列表
  fetchModuleDelete, // 删除模块
  fetchModuleDetail, // 获取模块详情
  fetchChangeModuleStatus, // 修改模块详情
  fetchModuleUpdateDetail, // 修改模块详情
  fetchModuleAdd, // 新增模块
  fetchButtonList, // 按钮权限列表
} from '@apis/manage'
import '@styles/set.less'

import ModuleList from './moduleList'
import ModuleModal from './modal/moduleAdd' // 新增修改模块
import ButtonModal from './modal/buttonModal' // 按钮权限列表
import AddButtonModal from './modal/addButtonModal' // 新增修改按钮权限

const { Content } = Layout

// 声明组件  并对外输出
export default class userManage extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = {
      title: '新增菜单',
      pid: '',
      itemId: '',
      type: '',
      values: {
        id: '',
        key: '',
        module: '',
        name: '',
        sort: '',
        type: '',
      },
      moduleDetailResult: {
        id: '',
        key: '',
        module: '',
        name: '',
        sort: '',
        type: '',
      },
      Visible: false,
      buttonVisible: false,
      addButtonVisible: false,
      buttonEditState: '', // 按钮是处于修改还是新增新增状态
      butttonListLoading: false, // 按钮列表加载状态
      buttonEditData: {},
      buttonDataSource: [], // 按钮列表数据
      tableListLoading: false, // 表格列表加载状态
      tableDataSource: [], // 表格列表列表数据
    };
    this.moduleAdd = this.moduleAdd.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleModify = this.handleModify.bind(this);
    this.handleAddNode = this.handleAddNode.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.buttonList = this.buttonList.bind(this);
    this.addButton = this.addButton.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleAddCancel = this.handleAddCancel.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
    this.editButton = this.editButton.bind(this);
  }

  // 组件已经加载到dom中
  componentWillMount() {
    // 做判断，如果是超级管理员，才会显示模块管理权限
    if (!(sessionStorage.getItem('roleName') === '0')) {
      // if (!(sessionStorage.getItem('roleName') === '超级管理员' && sessionStorage.getItem('usercode') === 'admin')) {
      // hashHistory.goBack()
      // return
    }
    this.getTableList();
  }

  // 删除模块
  handleDelete(id) {
    fetchModuleDelete({ id: id }, (result) => {
      message.success(result.msg);
      this.getTableList();
    });
  }

  // 修改模块
  handleModify(id, parentid) {
    fetchModuleDetail({ id: id }, (result) => {
      this.setState({
        Visible: true,
        title: '修改菜单',
        pid: parentid,
        itemId: id,
        type: 'modify',
      });
    });
  }

  // 更改模块状态
  handleChangeStatus(id, val) {
    fetchChangeModuleStatus({ id: id, status: val }, (result) => {
      this.getTableList();
    });
  }

  // 新增模块
  moduleAdd() {
    this.setState({
      Visible: true,
      title: '新增菜单',
      pid: '',
      type: 'add',
    });
  }

  // 新增模块子菜单
  handleAddNode(id) {
    this.setState({
      Visible: true,
      title: '新增子菜单',
      pid: id,
      type: 'add',
    });
  }

  // form 表单保存后调用
  handleOk() {
    this.getTableList();
    this.setState({ Visible: false });
  }

  // 隐藏新增修改窗口
  handleCancel() {
    this.setState({ Visible: false, type: 'add' })
  }

  // 显示按钮权限窗口
  buttonList(id, parentid) {
    this.setState({
      buttonVisible: true, pid: parentid, itemId: id,
    }, () => {
      this.getButtonList()
    })
  }

  // 关闭按钮权限列表
  cancelButton() {
    this.setState({
      buttonVisible: false,
    })
  }

  // 新增按钮权限
  addButton() {
    this.setState({
      buttonEditState: 'add',
      addButtonVisible: true,
      title: '新增按钮权限',
    })
  }

  // 新增、修改按钮权限
  handleAdd(params) {
    if (this.state.buttonEditState !== 'add') {
      fetchModuleUpdateDetail({ ...params, parentId: this.state.itemId }, (result) => {
        message.success(result.msg)
        this.handleAddCancel()
      })
    } else {
      fetchModuleAdd({ ...params, parentId: this.state.itemId }, (result) => {
        message.success(result.msg)
        this.handleAddCancel()
      })
    }
  }

  // 取消保存
  handleAddCancel() {
    this.setState({
      addButtonVisible: false,
      buttonEditData: {},
    }, () => {
      this.getButtonList()
    })
  }

  // 修改按钮数据
  editButton(params) {
    this.setState({
      buttonEditState: 'edit',
      buttonEditData: params,
      addButtonVisible: true,
      title: '修改按钮权限',
    })
  }

  getButtonList = () => {
    this.setState({
      butttonListLoading: true,
    }, () => {
      fetchButtonList({ id: this.state.itemId }, (result) => {
        this.setState({
          butttonListLoading: false,
          buttonDataSource: result.data.list,
        })
      })
    })
  }
  getTableList() {
    this.setState({
      tableListLoading: true,
    }, () => {
      fetchModuleList({}, (result) => {
        this.setState({
          tableListLoading: false,
          tableDataSource: result.data.list,
        })
      })
    })
  }


  footer() {
    return (
      <div>
        <Button type="primary">确定</Button>
        <Button>取消</Button>
      </div>
    )
  }

  render() {
    const {
      buttonEditState, buttonEditData, butttonListLoading, buttonDataSource, tableListLoading, tableDataSource, moduleDetailResult,
    } = this.state
    const thevalue = this.state.type === 'modify' ? moduleDetailResult : this.state.values
    return (
      <div className="page page-scrollfix page-usermanage page-modulemanage">
        <Layout>
          <Layout className="page-body">
            <Content>
              {/* <div className="page-header">
                <div className="text-right">
                  <Button type="primary" onClick={this.moduleAdd} > 新增模块</Button>
                </div>
              </div> */}
              <div className="page-content">
                <ModuleList
                  dataSource={tableDataSource}
                  loading={tableListLoading}
                  // scroll={{ y: global.$GLOBALCONFIG.PAGEHEIGHT - 165 }}
                  onDelete={this.handleDelete}
                  onModify={this.handleModify}
                  onUpdataStatus={this.handleChangeStatus}
                  onAddNode={this.handleAddNode}
                  buttonList={this.buttonList}
                />
              </div>
              <div className="page-footer">
                <div className="page-footer-buttons">
                  <Button type="primary" onClick={this.moduleAdd} > 新增模块</Button>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
        {
          this.state.Visible ?
            <ModuleModal
              handleOk={this.handleOk}
              visible={this.state.Visible}
              title={this.state.title}
              pid={this.state.pid}
              itemId={this.state.itemId}
              values={thevalue}
              type={this.state.type}
              onCancel={this.handleCancel}
            />
            : null
        }
        {
          this.state.buttonVisible ?
            <ButtonModal
              visible={this.state.buttonVisible}
              pid={this.state.pid}
              itemId={this.state.itemId}
              addButton={this.addButton}
              cancelButton={this.cancelButton}
              editButton={this.editButton}
              listLoading={butttonListLoading}
              dataSource={buttonDataSource}
              updateList={() => { this.getButtonList() }}
            />
            : null
        }
        {
          this.state.addButtonVisible ?
            <AddButtonModal
              title={this.state.title}
              visible={this.state.addButtonVisible}
              onCancel={this.handleAddCancel}
              handleAdd={this.handleAdd}
              state={buttonEditState}
              buttonEditData={buttonEditData}
            />
            : null
        }
      </div>
    )
  }
}
