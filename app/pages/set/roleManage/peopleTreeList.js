
import React, { Component } from 'react'
import TableList from '@tableList'

export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {}

  componentDidMount() {
  }

  // #region 收缩业务代码功能

  columns() {
    return (
      [{
        title: '功能',
        dataIndex: 'resName',
        key: 'resName',
        width: '30%',
      }, {
        title: '已选模块',
        dataIndex: 'checkedArr',
        key: 'checkedArr',
        width: '40%',
      }]
    )
  }

  // #endregion

  render() {
    const {
      dataSource,
    } = this.props
    return (
      <div className="flexcolumn roleModuleList">
        <TableList
          rowKey="id"
          columns={this.columns()}
          dataSource={dataSource}
          scroll={{ y: true }}
          indentSize={30}
        />
      </div>
    )
  }
}
