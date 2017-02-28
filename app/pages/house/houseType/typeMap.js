import React, { Component } from 'react'
import { Table, Row, Col, Pagination } from 'antd'
import Map from 'components/AMap/amap'


export default class TypeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      place: '鄂尔多斯东胜区纺织街道23号4幢',
      list: [
        { address: '鄂尔多斯东胜区纺织街道23号1幢', id: 1 },
        { address: '鄂尔多斯东胜区纺织街道23号2幢', id: 2 },
        { address: '鄂尔多斯东胜区纺织街道23号3幢', id: 3 },
        { address: '鄂尔多斯东胜区纺织街道23号4幢', id: 4 },
        { address: '鄂尔多斯东胜区纺织街道23号5幢', id: 5 },
        { address: '鄂尔多斯东胜区纺织街道23号6幢', id: 6 },
      ],
    }
    this.onShowSizeChange = this.onShowSizeChange.bind(this)
    this.viewDetail = this.viewDetail.bind(this)
  }
  componentDidMount() {
    // debugger
  }

  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.houseId.id) {
      if (nextProps.houseId.lng && nextProps.houseId.lat) {
        const map = this.mapRef._map
        // eslint-disable-next-line no-undef
        const marker = new AMap.Marker({ position: [nextProps.houseId.lng, nextProps.houseId.lat] })
        map.setCenter([nextProps.houseId.lng, nextProps.houseId.lat])
        marker.setMap(map)
      }
    }
  }

  viewDetail(data, event) {
    console.log(data)
    console.log(event)
  }

  render() {
    const _self = this
    const {
            dataSource,
            currentPage,
            totalCount,
            loading,
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
    let lis = this.state.list.map((item) =>
      (
        <li key={item.id}>
          <span className="address">{item.id}{item.address}</span>
          <span className="detail" onClick={this.viewDetail.bind(event, item)}>详情</span>
        </li>
      )
    )
    return (
      <div className="main">
          <div className="box">
            <Row>
              <Col span={6}>
                <div className="type-map">
                  <h3>建筑物地址</h3>
                  <ul>{lis}</ul>
                </div>
              </Col>
              <Col span={18}>
                <Map
                  id="mapContainer"
                  ref={r => this.mapRef = r}
                  screatKey="a5ebc730f80db3b1375a691afad00942"
                  style={{ height: '400px' }}
                  options={{
                    zoom: 14,
                  }}
                  events={{
                    complete: this.handleMapComplete,
                  }}
                />
              </Col>
            </Row>
            <Pagination
              showSizeChanger
              onShowSizeChange={this.onShowSizeChange}
              defaultCurrent={currentPage}
              total={500}
            />,
          </div>
      </div>
    )
  }
}
