import React, { Component } from 'react'
import { Tag, Button } from 'antd'
import './style.css'
// 详情页统一上方tag标签和button
// props:
//    tag :["账号状态：在线","审核状态：已审核"]
//    button  : [
//       {
//           text:"审核通过",
//           hide: false,
//           onClick() {self._handleVerify()},
//       },
//   ]

export default class TagAndButton extends Component {
  render() {
    const {
            tag,
            button,
        } = this.props;
    return (
      <div className="detail-tag-button">
        <div className="detail-tag">
          {
            (tag || []).map((text, index) => (
              <Tag key={index} color="green">{text}</Tag>
              )
            )
          }
        </div>
        <div className="detail-button">
          {
            (button || []).map((btn, index) => (
              <Button key={index}
                style={{ display: btn.hide ? 'none' : 'inline-block' }}
                disabled={btn.disable ? 'disabled' : ''}
                type={btn.Type ? btn.Type : 'primary'}
                onClick={btn.onClick}
              >
                {btn.text}
              </Button>
            ))
          }
        </div>
      </div>
    )
  }
}
