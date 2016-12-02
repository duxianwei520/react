
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


import './style.css'

@connect(
    (state, props) => ({}),
    (dispatch) => ({ actions: bindActionCreators({}, dispatch) })
)
export default class Login extends Component {
  render() {
    const { location, children } = this.props
    return (
      <div className="login">login</div>
    )
  }
}
