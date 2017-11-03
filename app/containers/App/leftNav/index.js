import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { Menu, Icon, Spin } from 'antd'
import { updateTabList } from 'actions/tabList'

const SubMenu = Menu.SubMenu

@connect(
    (state, props) => ({ config: state.config }),
    (dispatch) => ({ actions: bindActionCreators(routerActions, dispatch), dispatch: dispatch })
)
export default class LeftNav extends Component {

  constructor(props, context) {
    super(props, context)

    const { pathname } = props.location
    this.state = {
      current: pathname,
      openKeys: ['sub1'],
      isLeftNavMini: false,
    }

    this._handleClick = this._handleClick.bind(this)
    this._handleToggle = this._handleToggle.bind(this)
    this.navMini = this.navMini.bind(this)
    this.renderLeftNav = this.renderLeftNav.bind(this)
  }

  componentWillMount() {
    // 初始化左侧菜单是mini模式还是正常模式
    if (sessionStorage.getItem('isLeftNavMini') == 'false') {
      this.setState({
        isLeftNavMini: false,
      })
    }
    if (sessionStorage.getItem('isLeftNavMini') == 'true') {
      this.setState({
        isLeftNavMini: true,
      })
    }
    const menu = window.$GLOBALCONFIG.NAVIGATION
    const curPath = `${this.props.location.pathname.replace('/', '')}`
    // console.log(menu)
    let len = 0
    let curSub = 0
    menu.map(item => {
      if (item.url && curPath === item.url) {
        curSub = len
      } else if (item.children && item.children.length > 0) {
        item.children.map(record => {
          if (curPath === record.url) {
            curSub = len
          }
        })
      }
      if (item.children && item.children.length > 0) {
        len++
      }
    })
    // console.log(curSub)
    this.setState({
      openKeys: [`sub${curSub}`],
    })
  }

  _handleClick(e) {
    const { actions } = this.props
    // console.log('click ', e)
    this.setState({
      current: e.key,
      // openKeys: e.keyPath.slice(1),
    }, () => {
      actions.push(e.key)
      this.props.dispatch(updateTabList({ title: e.item.props.name, content: '', key: e.key }))
    })
  }

  _handleToggle(openKeys) {
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys(key) {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
  // 左侧菜单切换显示模式
  navMini() {
    this.setState({
      isLeftNavMini: !this.state.isLeftNavMini,
    }, () => {
      // console.log(this.state.isLeftNavMini)
      this.props.leftNavMode(this.state.isLeftNavMini)
    })
  }

  // 二级菜单的生成
  renderLeftNav(options) {
    const self = this
    return options.map((item, index) => {
      if (!item.children) {
        return (
          // <SubMenu key={index} title={item.name}>
            <Menu.Item key={item.url ? item.url : item.id} name={item.name}>
              <Icon type={item.icon} title={item.name} />
              <span className="menu-name">{item.name}</span>
            </Menu.Item>
          // </SubMenu>
        )
      } else {
        return (
          <SubMenu key={`sub${index}`} title={
            <span>
              <Icon type="caret-down" title={item.name} />
              <span className="menu-name">{item.name}</span>
            </span>}>
            {
              item.url ?
                <Menu.Item key={item.url} name={item.name}>
                  <Icon type={item.icon} title={item.name} />
                  <span className="menu-name">{item.name}</span>
                </Menu.Item> : null
            }

            {
              item.children && item.children.length > 0 ? self.renderLeftNav(item.children) : null
            }
          </SubMenu>
        )
      }
    })
  }

  render() {
    // const { loading } = this.props.navResult
    // const navs = this.props.config.NAVIGATION || []
    // console.log('this.props.location', this.props.location)
    // const selectedKeys = [`${this.props.location.pathname.split('$')[0]}$`.replace('/', '')]

    const selectedKeys = [this.props.location.pathname.replace('/', '')]
    // console.log(this.state.openKeys)
    return (
      <div className={this.state.isLeftNavMini ? 'LeftNavMini' : ''}>
        <nav id="mainnav-container" className="mainnav-container">
          <div className="LeftNav-control" onClick={this.navMini}>
            <i className="qqbicon qqbicon-navcontrol" />
          </div>
          <Spin spinning={false}>
            <Menu onClick={this._handleClick}
              theme="dark"
              openKeys={this.state.openKeys}
              onOpenChange={this._handleToggle}
              // selectedKeys={[`${this.props.location.pathname}`]}
              selectedKeys={selectedKeys}
              mode="inline"
              // mode="vertical"
            >
              { this.renderLeftNav(this.props.config.NAVIGATION || []) }
            </Menu>
          </Spin>
        </nav>
      </div>
    )
  }
}
