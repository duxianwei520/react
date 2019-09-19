/*
 * @Author: hy
 * @Date: 2019-05-24 14:46:23
 * @Last Modified by: dupi
 * @Last Modified time: 2019-09-19 14:19:56
 */

// socket on

import React, { Component } from 'react'
import socket from '@configs/socket'
import { socketReceive } from '@actions/common'
import { connect } from 'react-redux'

@connect(() => ({}))
export default class SocketOn extends Component {
  componentDidMount() {
    console.log('socket didmount')
    this.init()
  }

  init = () => {
    const callback = (res) => {
      this.props.dispatch(socketReceive(res))
    };
    socket.on('dispatch', callback);
  }

  render() {
    return null
  }
}
