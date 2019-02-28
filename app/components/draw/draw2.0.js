/*
 * @Author: 韩卿
 * @Date: 2017-08-20 16:07:21
 * @Last Modified by: dupi
 * @Last Modified time: 2018-10-22 17:10:34
 */


import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
// import configure from '../../store/configureStore'

import './draw.less'

// const store = configure({ config: global.$GLOBALCONFIG })

// 声明组件  并对外输出
export default class Drawer extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props, context) {
    super(props, context)
    this.state = {
      // activeTab: 'pop' ,
      drawTrasformClass: '',
      maskTrasformClass: '',
      drawerSizeClass: 'modal-base',
      // drawerSizeClassList: ['modal-base', 'modal-sm', 'modal-lg'],
    }
  }

  componentWillMount() {
    const {
      size = 'default',
    } = this.props
    this.getDrawerSize(size)
    this.setTrasformClass()
  }


  // 组件已经加载到dom中
  componentDidMount() {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.initDrawer()
    }
  }

  // 监测visible属性,
  componentWillReceiveProps(nextProps) {
    /* const {
      visible = true,
    } = this.props
    console.log(visible)
    console.log(nextProps)
    if (visible || nextProps.visible) {
      this.initDrawer()
    } else {
      this.removeDrawer()
    } */
  }

  componentDidUpdate() {
    this.renderDrawer()
  }

  componentWillUnmount() {
    // <setTimeo></setTimeo>ut(() => {
    ReactDOM.unmountComponentAtNode(this.popup)
    // }, 300)
  }

  // 初始化抽屉
  initDrawer = () => {
    this.popup = document.createElement('div')
    this.popup.setAttribute('class', 'drawers')
    this.renderDrawer()
    document.body.appendChild(this.popup)
    this.setTrasformClass()
  }

  // 抽屉添加动画效果class的设置
  setTrasformClass = () => {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.setState({
        drawTrasformClass: 'draw-enter',
        maskTrasformClass: 'mask-enter',
      }, () =>
        setTimeout(() => {
          this.setState({
            drawTrasformClass: '',
            maskTrasformClass: '',
          })
        }, 300))
    }
  }

  // 移除弹窗
  removeDrawer = () => {
    this.setState({
      drawTrasformClass: 'draw-leave',
      maskTrasformClass: 'mask-leave',
    }, () =>
      setTimeout(() => {
        this.setState({
          drawTrasformClass: '',
          maskTrasformClass: '',
        })
        document.body.removeChild(this.popup)
        ReactDOM.unmountComponentAtNode(this.popup)

        this.props.onCancel()
      }, 200))
  }

  // 判断抽屉的尺寸class
  getDrawerSize = (size) => {
    switch (size) {
      case 'sm':
        this.setState({
          drawerSizeClass: 'drawer-sm',
        })
        break
      case 'lg':
        this.setState({
          drawerSizeClass: 'drawer-lg',
        })
        break
      default:
        this.setState({
          drawerSizeClass: 'drawer-base',
        })
        break
    }
  }

  // 将弹窗内容插入到指定dom中
  renderDrawer() {
    const {
      title = '标题',
      footer = null,
    } = this.props
    const {
      drawTrasformClass,
      maskTrasformClass,
      drawerSizeClass,
    } = this.state

    ReactDOM.render(
      <div className="drawer-wrap">
        <div className={`${maskTrasformClass} ant-modal-mask`} onClick={() => this.removeDrawer()} />
        <div className={`${drawTrasformClass} draw ${drawerSizeClass}`}>
          <div className="ant-modal">
            <div className="ant-modal-content">
              <button className="ant-modal-close">
                <span className="ant-modal-close-x" onClick={() => this.removeDrawer()} />
              </button>
              <div className="ant-modal-header">
                <div className="ant-modal-title">{title}</div>
              </div>
              <AntModalBody context={this.context}>
                {this.props.children}
              </AntModalBody>
              <div className="ant-modal-footer">
                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>,
      this.popup,
    )
  }

  render() {
    return null
  }
}

Drawer.contextTypes = {
  form: PropTypes.object,
  vertical: PropTypes.bool,
  store: PropTypes.object,
};

class AntModalBody extends Component {
  getChildContext() {
    return { form: this.props.context.form, vertical: this.props.context.vertical, store: this.props.context.store }
  }
  render() {
    return (
      <div className="ant-modal-body">
        {this.props.children}
      </div>
    )
  }
}

AntModalBody.childContextTypes = {
  form: PropTypes.object,
  vertical: PropTypes.string,
  store: PropTypes.object,
}
