
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
// import { Provider } from 'react-redux'
import PropTypes from 'prop-types';
// import { Form } from 'antd'
// import configure from '../../store/configureStore'

import './draw.less'

// const store = configure({ config: global.$GLOBALCONFIG })
// @Form.create({})

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
    document.body.classList.add('body-drawer')
  }


  // 组件已经加载到dom中
  componentDidMount() {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.initDrawer()
    }
    const {
      size = 'default',
    } = this.props
    this.getDrawerSize(size)
    this.setTrasformClass()
  }

  // 监测visible属性,
  componentWillReceiveProps(nextProps) {

  }

  componentDidUpdate() {
    const {
      visible = true,
    } = this.props
    if (visible) {
      this.renderDrawer()
    }
  }

  componentWillUnmount() {
    this.renderDrawer({
      drawTrasformClass: 'draw-leave',
      maskTrasformClass: 'mask-leave',
    })
    setTimeout(() => {
      // document.body.removeChild(this.popup)
      document.body.classList.remove('body-drawer')
      ReactDOM.unmountComponentAtNode(this.popup)
    }, 300) // 组件即将卸载掉，执行动画再卸载
  }

  // 初始化抽屉
  initDrawer = () => {
    this.popup = document.createElement('div')
    this.popup.setAttribute('class', 'drawers')
    document.body.appendChild(this.popup)
    this.renderDrawer()
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
      }, () => {
        setTimeout(() => {
          this.setState({
            drawTrasformClass: '',
            maskTrasformClass: '',
          })
        }, 300)
      })
    }
  }

  // 移除弹窗
  removeDrawer = () => {
    this.setState({
      drawTrasformClass: 'draw-leave',
      maskTrasformClass: 'mask-leave',
    }, () => {
      setTimeout(() => {
        this.setState({
          drawTrasformClass: '',
          maskTrasformClass: '',
        })
        document.body.removeChild(this.popup)
        document.body.classList.remove('body-drawer')
        ReactDOM.unmountComponentAtNode(this.popup)
        this.props.onCancel()
      }, 250)
    })
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
  renderDrawer(_class = {}) {
    const {
      title = '标题',
      footer = null,
    } = this.props
    const {
      // drawTrasformClass,
      // maskTrasformClass,
      drawerSizeClass,
    } = this.state

    // 优先使用自己定义的class动画
    const drawTrasformClass = _class.drawTrasformClass || this.state.drawTrasformClass
    const maskTrasformClass = _class.maskTrasformClass || this.state.maskTrasformClass

    ReactDOM.render(
      <div className="drawer-wrap">
        <div className={`${maskTrasformClass} ant-modal-mask`} onClick={() => this.removeDrawer()} />
        <div className={`${drawTrasformClass} draw ${drawerSizeClass} ${this.props.className}`}>
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
              {
                footer ?
                  <div className="ant-modal-footer">
                    {footer}
                  </div> : null
              }
            </div>
          </div>
        </div>
      </div>,
      this.popup,
    )
  }

  render() {
    // const {
    //   title = '标题',
    //   footer = null,
    // } = this.props
    // const {
    //   drawTrasformClass,
    //   maskTrasformClass,
    //   drawerSizeClass,
    // } = this.state
    return (
      // <div className="drawer-wrap">
      //   <div className={`${maskTrasformClass} ant-modal-mask`} onClick={() => this.removeDrawer()} />
      //   <div className={`${drawTrasformClass} draw ${drawerSizeClass}`}>
      //     <div className="ant-modal">
      //       <div className="ant-modal-content">
      //         <button className="ant-modal-close">
      //           <span className="ant-modal-close-x" onClick={() => this.removeDrawer()} />
      //         </button>
      //         <div className="ant-modal-header">
      //           <div className="ant-modal-title">{title}</div>
      //         </div>
      //         <div className="ant-modal-body">
      //           {this.props.children}
      //         </div>
      //         <div className="ant-modal-footer">
      //           {footer}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      null
    )
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
