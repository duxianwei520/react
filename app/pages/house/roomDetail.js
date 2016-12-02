import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Spin, Tabs } from 'antd'
// import TagAndButton from 'components/detailContent/tagAndButton'
import { fetchHouseDetail } from 'actions/house'
import { updateTabList } from 'actions/tabList'
import { ROOM_MENUS } from 'utils/config'

import Location from './detail/location'
import Pic from './detail/pic'
import Floor from './detail/floor'
import Check from './detail/Check'
import Record from './detail/record'
import Log from './detail/log'


const TabPane = Tabs.TabPane

@connect(
    (state) => ({
      config: state.config,
      houseDetailResult: state.houseDetailResult,
    })
)
export default class houseDetail extends Component {
  constructor(props) {
    super(props)
    this.state = { activeSub: 'location'}
  }

  componentDidMount() {
    // debugger
    const houseId = this.props.houseId || this.props.params.houseId || 1
    const roomId = this.props.roomId || this.props.params.roomId || 1
    if (this.props.params) {
      console.log(this.props.params)
      // 若非嵌套，则执行
      this.props.dispatch(updateTabList({
        title: `房间${roomId}`,
        key: `/roomDetail/${houseId}/${roomId}`,
      }))
    }
    this.props.dispatch(fetchHouseDetail({ houseId: houseId}))
  }
  componentWillReceiveProps(nextProps) {
    /*const houseId = this.props.houseId || this.props.params.houseId
    const nextShopId = nextProps.houseId || nextProps.params.houseId

    if (nextHouseId !== houseId) {
      this.props.dispatch(fetchHouseDetail({ houseId: nextHouseId}))
    }*/
  }

  _getTabMenus(){
    const CURRENT_SUB_MENU = []
    CURRENT_SUB_MENU.push(ROOM_MENUS[0])
        /* if(allowRole.allow_shop_real_order){
            CURRENT_SUB_MENU.push(HOUSE_SUB_MENUS[1]);
        }
        }*/
    CURRENT_SUB_MENU.push(ROOM_MENUS[1]);
    CURRENT_SUB_MENU.push(ROOM_MENUS[2]);
    CURRENT_SUB_MENU.push(ROOM_MENUS[3]);
    CURRENT_SUB_MENU.push(ROOM_MENUS[4]);
    // console.log('CURRENT_SUB_MENU', CURRENT_SUB_MENU)
    return CURRENT_SUB_MENU
  }
  _tabChange = (key) => {
    this.setState({ activeSub: key })
  }

  render() {
    const { loading } = this.props.houseDetailResult || false
    // console.log(this.props)
    // debugger
    const { dispatch } = this.props
    const houseId = this.props.houseId || this.props.params.houseId || 1
    const templateConfig = {
      location: (<Location houseId={1} />),
      pic: (<Pic houseId={1} />),
      floor: (<Floor houseId={houseId} />),
      check: (<Check houseId={houseId} />),
      record: (<Record houseId={houseId} />),
      log: (<Log houseId={houseId} />),
    }

    console.log(this.state.activeSub);
    return (
      <Spin spinning={loading}>
        <div className="detail-wrapper">
          <div className="detail-tab">
            <Tabs tabPosition="left" onChange={this._tabChange}>
              {
                this._getTabMenus().map((sub) => (
                  <TabPane tab={sub.name} key={sub.url} />
                ))
              }
            </Tabs>
          </div>
          <div className="detail-info">
            { templateConfig[this.state.activeSub]}
          </div>
        </div>
      </Spin>
    )
  }
}
