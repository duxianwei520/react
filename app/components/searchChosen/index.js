// 不依赖 redux
/*
    value 默认值
    keyName
    searchType 1商家 5 骑手 10员工 20渠道商家
    cityId
    onFieldsChange: 用于双向绑定，表单值改变时，将值传个searchForm
*/

import React, { Component } from 'react'
// import { fetchShopList, fetchStaffList, fetchRiderList }
// from 'actions/common'
// import { Input, Select } from 'antd';
import 'components/index.less'
import { createAjax } from '../../utils'

export default class searchChosen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      open: false,
      shopList: [],
      riderList: [],
      staffList: [],
      selectValue: null,
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.search = this.search.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleToggleSelect = this.handleToggleSelect.bind(this);
    this.hide = this.hide.bind(this);
    this.timeout = null
  }

  hide(event) {
    if (event.target.closest('.search-chosen')) {
      return;
    }
    this.setState({
      open: false,
    })
  }

  componentWillMount() {
    const self = this;
    document.addEventListener('click', self.hide)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hide)
  }


  getList() {
    let list = [];
    switch (this.props.searchType.toString()) {
    case '1': list = this.state.shopList;
      break;
    case '5': list = this.state.riderList;
      break;
    case '10': list = this.state.staffList;
      break;
    case '20': list = this.state.shopList;
      break
    default: break
    }
    return list;
  }

  getSelectList() {
    const list = this.getList();
    switch (this.props.searchType.toString()) {
    case '1' :
      return list.map((item, index) =>
        <li key={index} value={item.id}
          className={item.active ? 'active' : ''}
          onClick={this.handleSelectChange(item)}
        >{`${item.name}-${item.picName}-${item.mobile}`}</li>)
    case '5' :
      return list.map((item, index) =>
        <li key={index} value={item.id}
          className={item.active ? 'active' : ''}
          onClick={this.handleSelectChange(item)}
        >{`${item.name}-(${item.id})-${item.mobile}`}</li>)
    case '10' :
      return list.map((item, index) =>
        <li key={index} value={item.id}
          className={item.active ? 'active' : ''}
          onClick={this.handleSelectChange(item)}
        >{`${item.departName}-${item.name}-(${item.code})`}</li>)
    case '20' :
      return list.map((item, index) =>
        <li key={index} value={item.id}
          className={item.active ? 'active' : ''}
          onClick={this.handleSelectChange(item)}
        >{`${item.name}-${item.picName}-${item.mobile}`}</li>)
    default:
      return []
    }
  }

  handleSelectChange(value) {
    return () => {
      // const { cityId } = this.props;
      const cache = {};
      this.state.selectValue = value;
      switch (this.props.searchType.toString()) {
      case '1' :
        cache[`${this.props.keyName}CacheName`] = value.name;
        cache[`${this.props.keyName}CachePicName`] = value.picName;
        cache[`${this.props.keyName}CacheMobile`] = value.mobile;
        cache[this.props.keyName] = value.id;
        break;
      case '5' :
        cache[`${this.props.keyName}CacheName`] = value.name;
        cache[`${this.props.keyName}CacheId`] = value.id;
        cache[`${this.props.keyName}CacheMobile`] = value.mobile;
        cache[this.props.keyName] = value.id;
        break;
      case '10' :
        cache[`${this.props.keyName}CacheName`] = value.name;
        cache[`${this.props.keyName}CacheDepartName`] = value.departName;
        cache[`${this.props.keyName}CacheCode`] = value.code;
        cache[this.props.keyName] = value.code;
        break;
      case '20' :
        cache[`${this.props.keyName}CacheName`] = value.name;
        cache[`${this.props.keyName}CachePicName`] = value.picName;
        cache[`${this.props.keyName}CacheMobile`] = value.mobile;
        cache[this.props.keyName] = value.id;
        break;
      default :
        break;
      }
      this.props.onFieldsChange && this.props.onFieldsChange(cache)
      this.props.onSelectChange && this.props.onSelectChange(value);
      this.setState({
        open: false,
      })
    }
  }

  search(value) {
    const newValue = value.trim()
    const self = this;
    switch (this.props.searchType.toString()) {
    case '1' :
      newValue.length && createAjax('/common/shop-search', { cityId: this.props.cityId, key: newValue }, (result) => {
        self.setState({ shopList: result })
      })
      break;
    case '5':
      newValue.length && createAjax('/common/rider-search', { cityId: this.props.cityId, key: newValue }, (result) => {
        self.setState({ riderList: result })
      })
      break;
    case '10':
      newValue.length && createAjax('/common/staff-search', { cityId: this.props.cityId, key: newValue }, (result) => {
        self.setState({ staffList: result })
      })
      break;
    case '20' :
      newValue.length && createAjax('/common/shop-search', { cityId: this.props.cityId, key: newValue }, (result) => {
        self.setState({ shopList: result })
      })
      break;
    default:
      break;
    }
  }

  handleToggleSelect() {
    this.setState({
      open: !this.state.open,
    })
  }

  handleKeyDown() {
    event.stopPropagation();
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => { this.search(this.searchInput.value) },
      1000)
  }

  getInputValue() {
    const list = this.getList()
    let inputText = ''
    let name = ''
    let picName = ''
    let id = ''
    let mobile = ''
    let departName = ''
    let code = ''
    const { fieldsValue, keyName, defaultValue } = this.props;
    if (this.state.selectValue) {
      const selectValue = this.state.selectValue || {};
      switch (this.props.searchType.toString()) {
      case '1':
        inputText = `${selectValue.name}-${selectValue.picName}-${selectValue.mobile}`
        break;
      case '5':
        inputText = `${selectValue.name}-(${selectValue.id})-${selectValue.mobile}`
        break;
      case '10':
        inputText = `${selectValue.departName}-${selectValue.name}-(${selectValue.code})`
        break;
      case '20':
        inputText = `${selectValue.name}-${selectValue.picName}-${selectValue.mobile}`
        break
      default :
        break
      }
      return inputText
    }
    if (list.length) {
      switch (this.props.searchType.toString()) {
      case '1':
        list.map((item) => {
          item.active = false
          if (item.id === this.props.value) {
            item.active = true
            inputText = `${item.name}-${item.picName}-${item.mobile}`
          }
        })
        break;
      case '5':
        list.map((item) => {
          item.active = false
          if (item.id === this.props.value) {
            item.active = true
            inputText = `${item.name}-(${item.id})-${item.mobile}`
          }
        })
        break;
      case '10':
        list.map((item) => {
          item.active = false
          if (item.id === this.props.value) {
            item.active = true
            inputText = `${item.departName}-${item.name}-(${item.code})`
          }
        })
        break;
      case '20':
        list.map((item) => {
          item.active = false
          if (item.id === this.props.value) {
            item.active = true
            inputText = `${item.name}-${item.picName}-${item.mobile}`
          }
        })
        break
      default :
        break
      }
    } else if (fieldsValue) {
      switch (this.props.searchType.toString()) {
      case '1':
        name = fieldsValue[`${keyName}CacheName`] ?
          fieldsValue[`${keyName}CacheName`].value : '';
        picName = fieldsValue[`${keyName}CachePicName`] ?
          fieldsValue[`${keyName}CachePicName`].value : '';
        mobile = fieldsValue[`${keyName}CacheMobile`] ? fieldsValue[`${keyName}CacheMobile`].value : '';
        if (name) {
          inputText = `${name}-${picName}-${mobile}`
        }
        break;
      case '5':
        name = fieldsValue[`${keyName}CacheName`] ?
          fieldsValue[`${keyName}CacheName`].value : ''
        id = fieldsValue[`${keyName}CacheId`] ?
          fieldsValue[`${keyName}CacheId`].value : ''
        mobile = fieldsValue[`${keyName}CacheMobile`] ? fieldsValue[`${keyName}CacheMobile`].value : ''
        if (name) {
          inputText = `${name}-(${id})-${mobile}`
        }
        break;
      case '10':
        name = fieldsValue[`${keyName}CacheName`] ?
          fieldsValue[`${keyName}CacheName`].value : ''
        departName = fieldsValue[`${keyName}CacheDepartName`] ?
          fieldsValue[`${keyName}CacheDepartName`].value : ''
        code = fieldsValue[`${keyName}CacheCode`] ?
          fieldsValue[`${keyName}CacheCode`].value : ''
        if (name) {
          inputText = `${departName}-${name}-(${code})`
        }
        break;
      case '20':
        name = fieldsValue[`${keyName}CacheName`] ?
          fieldsValue[`${keyName}CacheName`].value : ''
        picName = fieldsValue[`${keyName}CachePicName`] ?
          fieldsValue[`${keyName}CachePicName`].value : ''
        mobile = fieldsValue[`${keyName}CacheMobile`] ?
          fieldsValue[`${keyName}CacheMobile`].value : ''
        if (name) {
          inputText = `${name}-${picName}-${mobile}`
        }
        break;
      default:
        break
      }
    } else if (defaultValue) {
      inputText = defaultValue
    }
    return inputText;
  }

  getValue() {
    return this.state.selectValue
  }

  handleSearch() {
    this.search();
  }

  render() {
    const value = this.getInputValue();
    return (
      <div className="search-chosen">
        <div className="search-chosen-single" onClick={this.handleToggleSelect}>
          <a title={value}>{value}</a>
          <i className="ant-select-arrow" aria-hidden="true" />
        </div>
        <div className={this.state.open ?
          'search-chosen-drop' : 'search-chosen-drop hide'}>
          <div className="search-chosen-search">
            <input ref={(c) => { this.searchInput = c }}
              className="search-input"
              type="text"
              onKeyDown={this.handleKeyDown}
            />
            <i className="anticon anticon-search" onClick={this.handleSearch} />
          </div>
          <ul className="search-chosen-result">
            {
              this.getSelectList()
            }
          </ul>
        </div>
      </div>
    );
  }
}
