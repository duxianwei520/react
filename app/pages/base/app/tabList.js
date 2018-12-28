import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { is } from 'immutable'
import { Tabs } from 'antd'
import { updateTabChecked, deleteTabFromList } from '@actions/tabList'

const { TabPane } = Tabs

@connect(
  (state, props) => ({ tabList: state.tabListResult }),
  dispatch => ({
    actions: bindActionCreators(routerActions, dispatch),
    dispatch: dispatch,
  }),
)
export default class TabList extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  componentDidMount() {
    // console.log('this.props', this.props);
  }
  onChange(activeKey) {
    const { actions } = this.props;
    this.props.dispatch(updateTabChecked({ activeKey: activeKey }))
    actions.push(activeKey)
  }
  onEdit(targetKey, action) {
    this[action](targetKey);
  }
  remove(targetKey) {
    const { actions, tabList } = this.props;
    let delIndex
    let activeKey

    if (targetKey === tabList.activeKey) {
      tabList.list.map((tab, index) => {
        // eslint-disable-next-line
        tab.key === targetKey ? delIndex = index : null;
      });
      // eslint-disable-next-line no-nested-ternary
      activeKey = tabList.list[delIndex + 1] ?
        tabList.list[delIndex + 1].key : (tabList.list[delIndex - 1] ?
          tabList.list[delIndex - 1].key : '');
      actions.push(activeKey);
    }
    this.props.dispatch(deleteTabFromList({ targetKey: targetKey }));
  }
  shouldComponentUpdate(nextProps, nextState) {
    const thisProps = this.props || {};

    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
      return true;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const key in nextProps) {
      if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
        return true;
      }
    }
    return false;
  }
  render() {
    const { tabList } = this.props
    return (
      <Tabs
        hideAdd
        onChange={this.onChange}
        activeKey={tabList.activeKey}
        type="editable-card"
        onEdit={this.onEdit}
      >
        {
          tabList.list.map(tab =>
            <TabPane tab={tab.title} key={tab.key}>{tab.content}</TabPane>)
        }
      </Tabs>
    )
  }
}
