import React, { Component } from 'react'
import { Row, Col, Tabs } from 'antd'
import Map from 'components/AMap/amap'
import Index from './location/index'
const TabPane = Tabs.TabPane;


export default class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '鄂尔多斯东胜区纺织街道23号4幢',
      activeTab: 'map',
    }
    this.typeChange = this.typeChange.bind(this)
  }
  componentDidMount() {
    // debugger
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

  typeChange(key) {
    this.setState({
      activeTab: key,
    })
  }

  render() {
    return (
      <div className="content">
          <div className="box">
            <div>
              <div className="title-wrap"><h3 className="title">{this.state.address}</h3></div>
              <div className="box-right">
                <Tabs defaultActiveKey="1" onChange={this.typeChange}>
                  <TabPane tab="地图" key="map">
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
                  </TabPane>
                  <TabPane tab="地址" key="table">
                    <Index houseId={1} />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
