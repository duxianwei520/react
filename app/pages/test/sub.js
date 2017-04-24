import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import Panel from 'components/panel'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'
import Third from './third'

@connect(
    (state, props) => ({
      config: state.config,
    })
)

export default class sub extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      
    }
  }

  componentDidMount() {
    
  }



  
  render() {
    return (
      <div>
        <h1>我是二级页面</h1>
        <Third />
      </div>
    )
  }
}
