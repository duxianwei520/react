import React, { Component } from 'react'
import { Link } from 'react-router'
import { Tabs, Row, Col, Button } from 'antd'
const TabPane = Tabs.TabPane


export default class Check extends Component {
  constructor(props) {
    super(props)
    this.newTabIndex = 0;
    const panes = [
      { 
        title: '1单元', 
        content: [
          {
            floor: 1, 
            rooms: [
              {
                name: 101,
              },
              {
                name: 102,
              },
              {
                name: 103,
              }
            ]
          },
          {
            floor: 2, 
            rooms: [
              {
                name: 201,
              },
              {
                name: 202,
              },
              {
                name: 203,
              }
            ]
          },
        ], 
        key: '1' 
      },
      { 
        title: '2单元', 
        content: [
          {
            floor: 1, 
            rooms: [
              {
                name: 101,
              },
              {
                name: 102,
              },
            ]
          },
        ],  
        key: '2' 
      },
    ]
    this.state = {
      housId: 1,
      address: '鄂尔多斯东胜区纺织街道23号4幢',
      activeKey: panes[0].key,
      panes
    }
    this.onChange = this.onChange.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.add = this.add.bind(this)
    this.remove = this.remove.bind(this)
    this.handleRoomClick = this.handleRoomClick.bind(this)
  }
  componentDidMount() {
    // debugger
  }

  onChange(activeKey) {
    this.setState({ activeKey });
  }
  onEdit(targetKey, action) {
    this[action](targetKey);
  }
  add() {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    panes.push({ title: '新建页签', content: '新页面', key: activeKey });
    this.setState({ panes, activeKey });
  }
  remove(targetKey) {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  // 点击房间的事件绑定
  handleRoomClick(item){
    console.log(item)
    // <Link to={`/roomDetail/${this.state.housId}/${item.name}`}>{item.name}</Link>
  }

  render() {
    const content = this.state.panes.map(pane => (
      <TabPane tab={pane.title} key={pane.key}>
       
        {
          pane.content.map((floor, index) => (
            (
              <div className="floor" key={index}>
                {
                  floor.rooms.map((rooms, index) => (
                    <Button 
                      key={index} 
                      size="large" 
                      className="rooms"
                      onClick={this.handleRoomClick.bind(event, rooms)} 
                      type="ghost">
                      <Link to={`/roomDetail/${this.state.housId}/${rooms.name}`}>{rooms.name}</Link>
                    </Button>
                  ))
                }
              </div>
            )
          ))
        }
      </TabPane>
    ))
    return (
      <div className="content check">
        <div style={{ marginBottom: 15 }}>
          <Button type="ghost" onClick={this.add}>新增</Button>
        </div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="line"
          onEdit={this.onEdit}
        >
        {content}
        </Tabs>
      </div>
    )
  }
}
