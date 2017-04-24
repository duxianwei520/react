import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import Panel from 'components/panel'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'
import Map from 'components/AMap/amap'

@connect(
    (state, props) => ({
      config: state.config,
    })
)

export default class popCheck extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      passwordDirty: false,
      markers: [] ,
    }
    this._handleMapComplete = this._handleMapComplete.bind(this)
    this.btnClick = this.btnClick.bind(this)
  }

  componentDidMount() {
    
  }

  btnClick(e){
    console.log()
  }

  _handleMapComplete(){
    this.map = this.mapRef._map
    const map = this.map
    // console.log(map)

    var lnglats = [
        [116.368904, 39.923423],
        [116.382122, 39.921176],
        [116.387271, 39.922501],
        [116.398258, 39.914600]
    ];
    var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
    let markers = []
    for (var i = 0, marker; i < lnglats.length; i++) {
        var marker = new AMap.Marker({
            position: lnglats[i],
            map: map
        });
        marker.content = '<div id="infoWindow'+i+'">我是第' + (i + 1) + '个Marker' + '<Button>按钮事件</Button></div>';
        marker.on('click', markerClick);
        marker.emit('click', {target: marker});
        
        
        markers.push(marker)
    }
    this.setState({
      markers: markers
    }, () => {
      this.state.markers.map((item, index) => {
        item.on('click', () => {
          ReactDom.render(
            <div>
              React入门教程
              <Button onClick={handleMarkderClick.bind(this, index)}> hahahah</Button>
            </div>,
            document.getElementById("infoWindow" + index)
          )
        })
      })
    })
    function handleMarkderClick(e, a){
      console.log(e)
      console.log(a)
    }
    function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
        
    }
    map.setFitView();

    
  }

  
  render() {
    return (
      <Panel>
        <Map ref={r => this.mapRef = r} 
          id="mapContainer" 
          style={{ width: '100%', height: '700px' }}
          options={{ zoom: 10 }}
          events={{ complete: this._handleMapComplete }}
        />
      </Panel>
    )
  }
}
