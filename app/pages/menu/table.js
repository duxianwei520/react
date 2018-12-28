
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Button, Spin, Form, Input, Table } from 'antd'
import {
  fetchHouseCheckList,
} from 'actions/house'

if (process.env.NODE_ENV === 'development') {
  console.log('development')
}

const FormItem = Form.Item

@Form.create({})

@connect((state, props) => ({
  config: state.config,
  houseCheckSearchResult: state.houseCheckSearchResult,
}))
export default class app extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // data: {},
    }
    this._handleSubmit = this._handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.dispatch(fetchHouseCheckList({ currentPage: 1 }, (respose) => {}))
  }

  _handleSubmit(currentPage) {
    this.props.dispatch(fetchHouseCheckList({ keyword: '' }))
  }


  columns() {
    return [
      {
        title: '序号',
        key: 'index',
        width: '5%',
        render: (text, recordId, index) => <span>{index + 1}</span>,
      },
      {
        title: '建筑物地址',
        dataIndex: 'address',
        key: 'address',
        width: '25%',
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
        width: '10%',
      },
      {
        title: '房屋状态',
        dataIndex: 'houseStatus',
        key: 'houseStatus',
        width: '15%',
      },
      {
        title: '地址属性',
        dataIndex: 'addressType',
        key: 'addressType',
        width: '15%',
      },
      {
        title: '操作',
        key: 'operate',
        // fixed: 'right',
        width: '10%',
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

  tableData() {
    return this.props.houseCheckSearchQuery.list
  }

  render() {
    const { houseCheckSearchResult, form } = this.props
    const { getFieldDecorator } = form
    // console.log(houseCheckSearchResult)
    return (
      <div className="page">
        <div className="search" style={{ marginBottom: '10px' }}>
          <Form onSubmit={this._handleSubmit} layout="inline">
            <FormItem label="关键字">
              {
                getFieldDecorator('keyword', {
                  rules: [{
                    required: false,
                  }],
                })(<Input placeholder="请输入关键字" size="default" style={{ width: '200px' }} />)
              }
            </FormItem>
            <Button type="primary" onClick={this._handleSubmit}>确定</Button>
          </Form>
        </div>
        <Spin spinning={houseCheckSearchResult.loading}>
          <Table
            rowKey="id"
            dataSource={houseCheckSearchResult.list}
            columns={this.columns()}
            pagination={{ total: houseCheckSearchResult.totalCount, pageSize: houseCheckSearchResult.pageSize }}
            scroll={{ y: true }}
            rowClassName={(record, index) => (record.id === 1 ? 'red' : 'base')}
          />
        </Spin>
      </div>
    )
  }
}
