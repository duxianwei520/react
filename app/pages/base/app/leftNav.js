import React, { Component } from 'react'
import { connect } from 'react-redux'
import { hashHistory/* , Link  */ } from 'react-router'
// import { routerActions } from 'react-router-redux'
import { Menu, Icon, Spin } from 'antd'
// import { updateTabList } from '@actions/tabList'
import { clearGformCache2 } from '@actions/common'

const { SubMenu } = Menu

@connect((state, props) => ({
  config: state.config,
}))
export default class LeftNav extends Component {
  constructor(props, context) {
    super(props, context)

    // const { pathname } = props.location
    this.state = {
      // current: pathname,
      openKeys: [],
      menuStyle: false,
      rootSubmenuKeys: [],
      menu: JSON.parse(sessionStorage.getItem('leftNav')) || [],
    }
  }

  componentDidMount() {
    this.init()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.openKeys(nextProps.location.pathname)
    }
  }

  init = () => {
    this.openKeys(this.props.location.pathname)
    const { menu } = this.state
    const arr = []
    menu.map((item, index) => {
      arr.push(`sub${index + 1}`)
    })
    this.setState({ rootSubmenuKeys: arr })
  }

  // 确认当前要打开的菜单
  openKeys = (pathname) => {
    /*
    **计算要打开的以及菜单
    */
    const { menu } = this.state
    const curPath = `${pathname.split('$')[0]}`.replace('/', '')
    if (curPath === '') { // 如果是默认首页，那么就不用往下计算了
      this.setState({
        openKeys: ['sub1'],
      })
      return
    }
    let count = 0

    // 定义一个标签语句
    // eslint-disable-next-line
      jumpOut1: 
    for (let i = 0; i < menu.length; i += 1) {
      const item = menu[i]
      count += 1
      if (item.resKey && curPath === item.resKey.split('$')[0].replace('/', '')) {
        // eslint-disable-next-line
          break jumpOut1
      } else if (item.children && item.children.length > 0) {
        // eslint-disable-next-line
          jumpOut2: 
        for (let j = 0; j < item.children.length; j += 1) {
          const record = item.children[j]
          if (item.resKey && curPath === record.resKey.split('$')[0].replace('/', '')) {
            // eslint-disable-next-line
              break jumpOut1
          }
        }
      }
    }
    this.setState({
      openKeys: [`sub${count - 1}`],
    })
  }

  // 菜单点击事件
  _handleClick = (e) => {
    this.props.dispatch(clearGformCache2({}))
    hashHistory.push(`/${e.key}`)
  }

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      })
    }
  }

  // 左侧菜单切换显示模式
  navMini = () => {
    this.setState({
      menuStyle: !this.state.menuStyle,
    }, () => {
      this.props.leftNavMode(this.state.menuStyle)
    })
  }

  // 二级菜单的生成
  renderLeftNav = (options) => {
    const { menu } = this.state
    return menu.map((item, index) => {
      if (!item.children || item.children.length === 0) {
        return (
          <Menu.Item key={item.resKey ? item.resKey : item.id} name={item.resName} style={{ paddingLeft: 0 }}>
            <i className={`qqbicon qqbicon-${item.resIcon}`} title={item.resName} />
            <span className="menu-name">{item.resName}</span>
          </Menu.Item>
        )
      }
      const key = `sub${index}`
      return (
        <SubMenu key={key}
          title={
            <span>
              <i className={`qqbicon qqbicon-${item.resIcon}`} title={item.resName} />
              <span className="menu-name">{item.resName}</span>
            </span>
          }
        >
          {
            item.children.map((child, _index) =>
              (
                <Menu.Item key={child.resKey ? child.resKey : child.id} name={child.resName}>
                  <i className={`qqbicon qqbicon-${child.resIcon}`} title={child.resName} />
                  <span className="menu-name">{child.resName}</span>
                </Menu.Item>
              ))
          }
        </SubMenu>
      )
    })
  }

  // 左侧菜单高亮的控制
  leftMenuHighLight = () => {
    const { pathname } = this.props.location
    // console.log(pathname)
    let selectedKeys = [pathname.replace('/', '')]
    if (pathname === '/' || pathname.indexOf('desk$/index') > -1) {
      selectedKeys = ['desk$/index']
    }
    return selectedKeys
  }

  render() {
    const { openKeys, menuStyle } = this.state
    return (
      <div className={menuStyle ? 'LeftNavMini' : ''}>
        <nav id="mainnav-container" className="mainnav-container">
          <div className="LeftNav-control" onClick={() => this.navMini()}>
            <i className="qqbicon qqbicon-navcontrol" />
          </div>
          <Spin spinning={false}>
            <Menu onClick={this._handleClick}
              theme="dark"
              openKeys={openKeys}
              onOpenChange={this.onOpenChange}
              selectedKeys={this.leftMenuHighLight()}
              mode="inline"
              inlineIndent="16"
              inlineCollapsed={menuStyle}
            >
              {this.renderLeftNav()}
            </Menu>
          </Spin>
        </nav>
      </div>
    )
  }
}
