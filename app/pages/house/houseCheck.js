import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, hashHistory } from 'react-router'
import { Table, Button, Tabs } from 'antd'
import { 
  fetchHouseCheckList, 
  updateHouseCheckListQuery, 
  resetHouseCheckListQuery } from 'actions/house'
import Panel from 'components/panel'
import SearchForm from 'components/searchForm'
import TypeList from './houseType/typeList'
import TypeMap from './houseType/typeMap'
import Gform from 'components/gForm'
import './style.css'

// import controllers from 'controllers/house/houseCheck'
// import * as controllers from 'controllers/house/houseCheck'
import { bindActionCreators } from 'redux'



const TabPane = Tabs.TabPane;

//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
    (state, props) => ({
      config: state.config,
      houseCheckSearchQuery: state.houseCheckSearchQuery,
      houseCheckSearchResult: state.houseCheckSearchResult,
      amList: state.amList,
    })/*, 
    dispatch => ({
      actions: bindActionCreators(controllers, dispatch)
    })*/
)

// 声明组件  并对外输出模块
export default class houseCheckList extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { 
      activeTab: 'list' ,
      list: [
        {
          id: 1, 
          address: '鄂尔多斯东胜区纺织街道23号4幢', 
          division: '东胜区纺织街', 
          institutions: '幸福街派出所',
          policeName: '特朗普',
          houseStatus: '已建房未访查',
          addressType: '标准地址'
        },
        {
          id: 2, 
          address: '鄂尔多斯富兴街道23号4幢', 
          division: '东胜区纺织街', 
          institutions: '幸福街派出所',
          policeName: '奥巴马',
          houseStatus: '已建房访查中',
          addressType: '非标准地址'
        }
      ]
    }
    this._handleSubmit = this._handleSubmit.bind(this)
    this.cacheSearch = this.cacheSearch.bind(this)
    this._clear = this._clear.bind(this)
    this._typeChange = this._typeChange.bind(this)
    this.test = this.test.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    // this.props.dispatch(fetchHouseCheckList({ currentPage: 1 }))
  }

  test(){
    console.log(hashHistory)
    // hashHistory.push('/houseManage')
    window.location.hash = '/login'
    // window.location.href = 'http://localhost:3000/#/login'
  }

  // 点击搜索按钮的回调事件
  _handleSubmit(query, currentPage) {
    this.props.dispatch(fetchHouseCheckList({ ...query, currentPage: currentPage }))
  }

  // 重置搜索条件
  _clear() {
    // this.props.dispatch(resetAmList())
    // this.props.dispatch(resetHouseCheckListQuery())
  }

  // 表格展示项的配置
  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '建筑物地址',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: '行政区划',
        dataIndex: 'division',
        key: 'division',
      },
      {
        title: '管辖单位',
        dataIndex: 'institutions',
        key: 'institutions',
      },
      {
        title: '管辖警员',
        dataIndex: 'policeName',
        key: 'policeName',
      },
      {
        title: '房屋状态',
        dataIndex: 'houseStatus',
        key: 'houseStatus',
      },
      {
        title: '地址属性',
        dataIndex: 'addressType',
        key: 'addressType',
      },
      {
        title: '操作',
        key: 'operate',
        fixed: 'right',
        width: 60,
        render: function (text, record, index) {
          return (
            <span>
              <Button type="primary" size="small">
                <Link to={`/houseDetail/${text.id}`}>查看</Link>
              </Button>
            </span>
          )
        },
      },
    ]
  }

  // 缓存更新
  cacheSearch(item) {
    console.log(item)
    this.props.dispatch(updateHouseCheckListQuery(item))
  }

  // 列表与地图模式切换的回调函数
  _typeChange(key){
    this.setState({ activeTab: key })
  }

  gFormConfig(){
    const { config } = this.props
    return [
      {
        sort: 'division',
        label: '行政区划',
        items: config.DIVISION
      },
      {
        sort: 'pop',
        label: '户籍类别',
        items: config.POP
      }
    ]
  }

  gFormSubmit(query){
    console.log(query)
  }


  render() {

    const actions = this.props.actions
    // console.log(actions)
    const { 
            houseCheckSearchQuery, 
            houseCheckSearchResult,
            hasSubmitBtn,
            hasResetBtn,
            config,
          } = this.props
    // 暂时用假数据来模拟列表项
    return (
      <Panel>
        <Gform gFormConfig={this.gFormConfig()} gFormSubmit={this.gFormSubmit} />
        <div><Button onClick={this.test}>测试</Button></div>
        <div className="list-tab">
          <Tabs tabPosition="top" onChange={this._typeChange}>
            <TabPane tab="列表" key="list">
              <TypeList  
                columns={this.columns()} 
                dataSource={this.state.list}
                // dataSource={houseCheckSearchResult.list}
                currentPage={houseCheckSearchResult.currentPage}
                scroll={{x: 1100}} 
                loading={houseCheckSearchResult.loading}
              />
            </TabPane>
            <TabPane tab="地图" key="map">
              <TypeMap
                houseId={1}
                dataSource={houseCheckSearchResult.list}
                currentPage={houseCheckSearchResult.currentPage}
                loading={houseCheckSearchResult.loading}
              />
            </TabPane>
          </Tabs>
        </div>
      </Panel>
    )
  }
}
