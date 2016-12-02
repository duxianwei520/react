import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button } from 'antd'
import { 
  fetchHouseCheckList, 
  updateHouseCheckListQuery, 
  resetHouseCheckListQuery } from 'actions/house'
import { resetAmList } from 'actions/common'
import Panel from 'components/panel'
import SearchTable from 'components/searchTable'

@connect(
    (state, props) => ({
      config: state.config,
      houseCheckSearchQuery: state.houseCheckSearchQuery,
      houseCheckSearchResult: state.houseCheckSearchResult,
      amList: state.amList,
    })
    /*function(state, props){
      console.log(state)
      console.log(props)
      return {
        config: state.config,
        houseCheckSearchQuery: state.houseCheckSearchQuery,
        houseCheckSearchResult: state.houseCheckSearchResult,
      
      }
    }*/
)
export default class houseCheckList extends Component {
  constructor(props) {
    super(props)
    this.state = { }
    this._handleSubmit = this._handleSubmit.bind(this)
    this.cacheSearch = this.cacheSearch.bind(this)
    this._clear = this._clear.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchHouseCheckList({ currentPage: 1 }))
  }

  _handleSubmit(query, currentPage) {
    // query.amRegions = this._getAmRegions(query.am)
    this.props.dispatch(fetchHouseCheckList({ ...query, currentPage: currentPage }))
  }

  searchList() {
    const { config } = this.props
    return [
      {
        key: 'keyword',
        label: '关键字',
        type: 'text',
      }, 
      {
        key: 'division',
        label: '行政区划',
        type: 'multiSelect',
        text: 'mean',
        value: 'code',
        options: config.ADMINISTRATIVE_DIVISION,
      }, 
      {
        key: 'institutions',
        value: 'code',
        text: 'mean',
        label: '管辖单位',
        type: 'defaultMultiSelect',
        options: config.ADMINISTRATIVE_DIVISION,
      }, 
      {
        key: 'houseStatus',
        value: 'code',
        text: 'mean',
        label: '房屋状态',
        type: 'select',
        options: config.ADMINISTRATIVE_DIVISION,
      }, 
      {
        key: 'addressType',
        value: 'code',
        text: 'mean',
        label: '地址属性',
        type: 'select',
        options: config.ADMINISTRATIVE_DIVISION,
      }
    ]
  }



  _clear() {
    this.props.dispatch(resetAmList())
    this.props.dispatch(resetHouseCheckListQuery())
  }

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

  cacheSearch(item) {
    this.props.dispatch(updateHouseCheckListQuery(item))
  }

  tableData() {
    return this.props.houseCheckSearchQuery.list
  }

  render() {
    const { houseCheckSearchQuery, houseCheckSearchResult } = this.props
    return (
      <Panel>
        <SearchTable
          onSubmit={this._handleSubmit}
          search={houseCheckSearchQuery}
          cacheSearch={this.cacheSearch}
          columns={this.columns()}
          searchList={this.searchList()}
          tableData={houseCheckSearchResult.list}
          currentPage={houseCheckSearchResult.currentPage}
          totalCount={houseCheckSearchResult.totalCount}
          clear={this._clear}
          scroll={{ x: 1100 }}
          loading={houseCheckSearchResult.loading}
          hasResetBtn = {false}
        />
      </Panel>
    )
  }
}
