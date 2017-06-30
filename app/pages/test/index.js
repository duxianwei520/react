/*
 * @Author: dupi
 * @Date: 2017-06-29 15:34:19
 * @Last Modified by: dupi
 * @Last Modified time: 2017-06-29 15:39:44
 */

import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { Cascader, Select, Row, Col, Checkbox, Button } from 'antd'


import Sub from './sub'

@connect(
    (state, props) => ({
      config: state.config,
    })
)

export default class popCheck extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: true,
    }
  }

  componentDidMount() {
    console.log(this.props)
  }


  render() {
    return (
      <div className="page">
        测试
        <span>weorwe</span>
        <img src="../../images/default.png" />
        <Sub />
      </div>
    )
  }
}
