/*
 * @Author: dupi
 * @Date: 2017-06-28 17:16:12
 * @Last Modified by: dupi
 * @Last Modified time: 2017-06-29 15:54:17
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Spin } from 'antd'
import {
  fetchHouseCheckList,
  updateHouseCheckListQuery,
  resetHouseCheckListQuery } from 'actions/house'
import { resetAmList } from 'actions/common'
import SearchTable from 'components/searchTable'

@connect(
  (state, props) => ({
    config: state.config,
    houseCheckSearchQuery: state.houseCheckSearchQuery,
    houseCheckSearchResult: state.houseCheckSearchResult,
  })
)
export default class houseCheckList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {

      },
    }
    this._handleSubmit = this._handleSubmit.bind(this)
    this.cacheSearch = this.cacheSearch.bind(this)
    this._clear = this._clear.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchHouseCheckList({ currentPage: 1 }, (respose) => {}))
  }

  _handleSubmit(query, currentPage) {
    // query.amRegions = this._getAmRegions(query.am)
    this.props.dispatch(fetchHouseCheckList({ ...query, currentPage: currentPage }))
  }

  searchList() {
    const { data } = this.state
    data && data.list && data.list.map(item => {

    })
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
        type: 'text',
      },
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
        width: '50px',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '建筑物地址',
        dataIndex: 'address',
        key: 'address',
        width: '15%',
      },
      {
        title: '行政区划',
        dataIndex: 'division',
        key: 'division',
        width: '10%',
      },
      {
        title: '管辖单位',
        dataIndex: 'institutions',
        key: 'institutions',
        width: '10%',
      },
      {
        title: '管辖警员',
        dataIndex: 'policeName',
        key: 'policeName',
        width: '100px',
      },
      {
        title: '房屋状态',
        dataIndex: 'houseStatus',
        key: 'houseStatus',
        width: '10%',
      },
      {
        title: '地址属性',
        dataIndex: 'addressType',
        key: 'addressType',
        width: '100px',
      },
      {
        title: '操作',
        key: 'operate',
        // fixed: 'right',
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

    // console.log(houseCheckSearchResult)
    return (
      <div className="page">
        <Spin spinning={houseCheckSearchResult.loading}>
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
            scroll={{ y: true }}
            loading={houseCheckSearchResult.loading}
            // hasResetBtn={false}
          />
        </Spin>
      </div>
    )
  }
}
