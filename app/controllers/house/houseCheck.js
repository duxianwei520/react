import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
  fetchHouseCheckList, 
  updateHouseCheckListQuery, 
  resetHouseCheckListQuery } from 'actions/house'

/*@connect(
    (state, props) => ({
      config: state.config,
      houseCheckSearchQuery: state.houseCheckSearchQuery,
      houseCheckSearchResult: state.houseCheckSearchResult,
    })
)*/
// 
export function initQuery(item) {
  // console.log(item)
  return dispatch => {
    dispatch(fetchHouseCheckList({ currentPage: 1 }))
  }
}

// 点击搜索按钮的回调事件
export function _handleSubmit(query, currentPage) {
  console.log(query)
	return dispatch => {
	  dispatch(fetchHouseCheckList({ ...query, currentPage: currentPage }))
	}
}

// 重置搜索
export function _clear() {
  return dispatch => {
    dispatch(resetHouseCheckListQuery())
  }
}

// 缓存更新
export function cacheSearch(item) {
	return dispatch => {
    dispatch(updateHouseCheckListQuery(item))
  }
}

// 测试
export function test(item) {
  return {
    type: 'test',
    arr: [1, 2, 3]
  }
}


export function searchList(e, config) {
    // const { config } = this.props
   /* console.log(e)
    console.log(config)
    console.log(this.props)
    debugger*/
   /* return [
      {
        key: 'keyword',
        label: '关键字',
        type: 'text',
      }, 
      {
        key: 'division',
        label: '行政区划',
        type: 'multiSelect',
        text: 'mean',
        value: 'code',
        options: config.ADMINISTRATIVE_DIVISION,
      }, 
      {
        key: 'institutions',
        value: 'code',
        text: 'mean',
        label: '管辖单位',
        type: 'select',
        options: config.ADMINISTRATIVE_DIVISION,
      }, 
      {
        key: 'houseStatus',
        value: 'code',
        text: 'mean',
        label: '房屋状态',
        type: 'defaultMultiSelect',
        options: config.ADMINISTRATIVE_DIVISION,
      }, 
      {
        key: 'addressType',
        value: 'code',
        text: 'mean',
        label: '地址属性',
        type: 'select',
        options: config.ADMINISTRATIVE_DIVISION,
      }
    ]*/
}

