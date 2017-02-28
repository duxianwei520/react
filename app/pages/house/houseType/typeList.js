import React, { Component } from 'react'
import { Table, Row, Col } from 'antd'


export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '鄂尔多斯东胜区纺织街道23号4幢',
    }
  }
  componentDidMount() {
    // debugger
  }


  render() {
    const _self = this
    const {
            columns,
            dataSource,
            currentPage,
            totalCount,
            loading,
            scroll,
        } = this.props
    const pagination = {
      total: totalCount || 1,
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
    // console.log(this.props.dataSource)
    return (
      <div className="detail-content">
        <Row gutter={16}>
          {
            <Col sm={24} md={24} lg={24}>
                  <div className="detail-box">
                    <Table
                      columns={columns}
                      dataSource={dataSource}
                      pagination={currentPage ? pagination : false}
                      loading={loading}
                      scroll={scroll}
                    />
                  </div>
            </Col>
          }
        </Row>
      </div>
    )
  }
}
