import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import Panel from 'components/panel'
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button } from 'antd'



@connect(
    (state, props) => ({
      config: state.config,
    })
)

export default class popCheck extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      
    }
  }

  componentDidMount() {
    
  }


  handleClick() {
    
  }
  
  render() {
    return (
      <div>
        <Button onClick={this.handleClick.bind(this)}>点击按钮</Button>
      </div>
    )
  }
}
