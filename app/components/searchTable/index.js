/*
    columns: array 详见antd
    tableData: array 详见antd
    searchList: array 详见searchForm
    search: store中存储的数据
    cacheSearch: 数据改变时的回调，用以缓存数据
    tableButton: [{
            type: 'primary', 引用antd Button的type
            text: 新增, //Button展示的文本
            onClick:  //点击时回调
        }]
    // tableButton的type为custom时，内容自定义。 --HKY
    // eg:{type:'custom',content:<span key="demo">1</span>}
    // tableButton的type为pointText时，内容为提示文字。--HKY
    // eg:{type:'pointText',text: '导入模板为订单编号，城市id，频次，数据类型四个字段的EXCEL'}
    formButton: 详见 searchForm
    formColsNum: searchForm 每行展示的列数，默认为4
    hasSubmitBtn: searchForm 是否有submit 默认true
    hasResetBtn: searchForm 是否有重置按钮 默认true
    clear: 重置时的回调 详见searchForm
*/

import React, { Component } from 'react'
// import { connect } from 'react-redux'
import 'components/index.less'
import { Table, Button } from 'antd'
import SearchForm from '../searchForm'

export default class riderList extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.getFormValue = this.getFormValue.bind(this)
  }

  onSubmit(query, current = 1) {
    this.props.onSubmit(query, current);
  }

  tableButtonClick(item) {
    return () => {
      const query = this.getFormValue();
      query.currentPage = this.props.currentPage
      item.onClick && item.onClick(query);
    }
  }

  getFormValue() {
    const form = this.props.formRef ? this.props.formRef : 'searchForm'
    // eslint-disable-next-line react/no-string-refs
    const query = this.refs[form].getFieldsValue();
    Object.keys(query).map((key) => {
      query[key] === undefined && delete (query[key])
    })
    return query
  }

  render() {
    const _self = this
    const {
            tableData,
            columns,
            searchList,
            search,
            cacheSearch,
            pageCount, // eslint-disable-line no-unused-vars
            currentPage,
            totalCount,
            clear,
            loading,
            formButton,
            tableButton,
            formColsNum,
            hasSubmitBtn,
            hasResetBtn,
        } = this.props
    const pagination = {
      total: totalCount,
      current: currentPage,
      showSizeChanger: false,
      pageSize: 20,
      showTotal(count) {
        return `共 ${count} 条`
      },
      onChange(current) {
        const query = _self.getFormValue();
        _self.onSubmit(query, current)
      },
    }
    let buttons = []
    if (tableButton) {
      buttons = tableButton.map((item, index) => {
        if (!item.type) {
          return <span key={index} className="text-info text-2x" style={{ verticalAlign: 'top' }}>{item.text}</span>
        }
        if (item.type === 'custom') {
          return item.content
        }
        if (item.type === 'pointText') {
          return (<p key={index}
            style={{ lineHeight: '30px',
              color: item.textColor ? item.textColor : 'red' }}
          >{item.text}</p>)
        }
        return (<Button key={index} type={item.type}
          onClick={this.tableButtonClick(item)}
        >{item.text}</Button>)
      })
    }
    return (
      <div className="search-form-table">
        <SearchForm
          ref={this.props.formRef ? this.props.formRef : 'searchForm'}
          onSubmit={this.onSubmit}
          manual={_self.props.manual}
          searchList={searchList}
          cacheSearch={cacheSearch}
          search={search}
          clear={clear}
          formButton={formButton}
          formColsNum={formColsNum}
          hasSubmitBtn={hasSubmitBtn}
          hasResetBtn={hasResetBtn}
        />
        <div className="table-button">
          { buttons }
        </div>
        <Table
          columns={columns}
          dataSource={tableData}
          pagination={currentPage ? pagination : false}
          scroll={this.props.scroll}
          loading={loading}
        />
      </div>
    )
  }
}
