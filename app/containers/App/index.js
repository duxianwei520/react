
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Header from './header'
import Footer from './footer'
import LeftNav from './leftNav'
import RightAside from './rightAside'
import TabList from './tabList'
import Extra from './extra'
import 'antd/dist/antd.less'
import '../../style/base.less'

@connect(
    (state, props) => ({}),
    (dispatch) => ({ actions: bindActionCreators({}, dispatch) })
)
export default class App extends Component {
  render() {
    const { location, children } = this.props
    return (
      <div id="container" className="effect easeInOutBack mainnav-lg aside-bright">
        <Header />
        <div className="boxed">
          <div id="content-container">
            <div id="page-content">
              <TabList />
              {children}
            </div>
          </div>
          <LeftNav location={location} />
          <RightAside />
        </div>
        <Footer />
        <Extra />
      </div>
    )
  }
}
