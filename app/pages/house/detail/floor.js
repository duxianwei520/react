import React, { Component } from 'react'
import { Row, Col } from 'antd'


export default class Floor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '鄂尔多斯东胜区纺织街道23号4幢'
     }
  }
  componentDidMount() {
    // debugger
  }


  render() {
    return (
      <div className="detail-content">
        <Row gutter={16}>
          {
            <Col sm={24} md={24} lg={24}>
                  <div className="detail-box">
                    {this.state.address}
                    <div>房屋工作</div>
                  </div>
            </Col>
          }
        </Row>
      </div>
    )
  }
}
