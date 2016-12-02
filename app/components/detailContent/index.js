import React, { Component } from 'react'
import { Row, Col } from 'antd'
// 统一布局用
// props: data
//     eg: [
//             {
//                 md: 13, // ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
//                 lg: 7, // ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
//                 box: [(<Basic />)],
//             },
//             {
//                 md: 11,
//                 lg: 5,
//                 box: [(<Account />), (<Pics />)],
//             },
//             {
//                 md: 24,
//                 lg: 12,
//                 box: [(<ServiceScope />)],
//             },
//         ]

export default class DetailContent extends Component {
  render() {
    const {
            data,
        } = this.props;
    return (
      <div className="detail-content">
        <Row gutter={16}>
          {
            (data || []).map((col, index) => (
              <Col key={index} sm={col.sm || 24} md={col.md || 24} lg={col.lg || 24}>
                {
                  (col.box || []).map((box, i) => (
                    <div key={`box-${i}`} className="detail-box">{box}</div>
                    )
                  )
                }
              </Col>
              )
            )
          }
        </Row>
      </div>
    )
  }
}
