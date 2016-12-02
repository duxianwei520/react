/*
**formConfig 配置要显示的搜索栏
  {
    [
      {
        sort: 'division',
        label: '行政区划',
        items: config.DIVISION
      },
      {
        sort: 'pop',
        label: '户籍类别',
        items: config.POP
      }
    ]
  }
  formSubmit 点击要保存的回调方法
*/

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Table, Button, Tabs, Row, Col, Input, Icon, Checkbox } from 'antd'
import { chunk, clone } from 'lodash'
import 'components/gForm/style.css'



//连接公用常量、后端返回的数据方法  并放置在props里面调用
@connect(
  (state, props) => ({
    config: state.config,
  })
)

// 声明组件  并对外输出模块
export default class form extends Component {
  // 初始化页面常量 绑定事件方法
  constructor(props) {
    super(props)
    this.state = { 
      keyword: '',
      total: 0,
      selectedArr: [],

      divisionData: [],
      divisionShow: true,
      divisionMultiShow: false,
      divisionHeight: false,

      popData: [],
      popShow: true,
      popMultiShow: false,
      popHeight: false,

      resData:{
          data: [
            {
              "id": "10001",
              "num": "2000"
            },
            {
              "id": "10002",
              "num": "3000"
            },
            {
              "id": "10101",
              "num": "555"
            },
            {
              "id": "10102",
              "num": "320"
            },
            {
              "id": "10103",
              "num": "132"
            },
            {
              "id": "10108",
              "num": "50"
            },
            {
              "id": "11001",
              "num": "30"
            },
            {
              "id": "11009",
              "num": "10"
            }
          ],
          status: 1,
          msg: '',
          errorCode: '',
          extraMsg: '',
          total: "1520"
      }
    }
    this.init = this.init.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.getItem = this.getItem.bind(this)
    this.handleCancelSelect = this.handleCancelSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleGformSubmit = this.handleGformSubmit.bind(this)
    this.changeNum = this.changeNum.bind(this)
    this.handelMultiSelect = this.handelMultiSelect.bind(this)
    this.handleMultiOk = this.handleMultiOk.bind(this)
    this.handleToggleCheckbox = this.handleToggleCheckbox.bind(this)
    this.handleSelectSet = this.handleSelectSet.bind(this)
    this.handleHight = this.handleHight.bind(this)
  }

  // 组件已经加载到dom中
  componentDidMount() {
    this.init()
  }

  // 进入页面初始化方法
  init(){
    this.props.gFormConfig.map((item) => {
      switch(item.sort){
        case 'division': 
          const divisionData = this.getItem("1", "", item.items)
          this.setState({divisionData: divisionData})
        break
        case 'pop': 
          const popData = this.getItem("1", "", item.items)
          this.setState({popData: popData})
        break
      }
    })
  }

  // 获取当前要显示的标签数组
  getItem(lv, pid, sort){
    const arr = []
    sort.map(item => {
      if(item.lv == lv && item.pid == pid){
        arr.push(item)
      }
    })
    return arr
  }

  // 点击选择标签
  handleSelect(item, items){
    const self = this
    const { config } = this.props
    switch(item.sort){
      case 'division':
        const divisionData = this.getItem(parseFloat(parseInt(item.lv) + 1), item.id, items)
        this.handleSelectSet('division', divisionData)
      break
      case 'pop':
        const popData = this.getItem(parseFloat(parseInt(item.lv) + 1), item.id, items)
        this.handleSelectSet('pop', popData)
      break
    }
    const arr = this.state.selectedArr
    // 防止运用过多选之后的已选项重复
    if(arr.length == 0){
      this.state.selectedArr.push(item)
    } else {
      let flag = true
      arr.map((option) => {
        if(option.id == item.id){
          flag = false
        }
      })
      if(flag){
        arr.push(item)
      }
    }
  }

  // 选择某个标签之后的数据处理
  handleSelectSet(type, data){
    const self = this
    if(type == 'division'){
      if(data.length == 0){
        this.setState({divisionShow: false})
      }
    } else if(type == 'pop'){
      if(data.length == 0){
        this.setState({popShow: false})
      }
    }
    
    const newState = {}
    newState[data] = data
    this.setState(newState)
    self.changeNum(type, data)
  }

  // 从后台获取标签数据 并且通过对比 将每项的数量填充上
  changeNum(type, data){
    // console.log(this.state.resData)
    const{ config } = this.props
    const self = this
    data.map(item => (
      self.state.resData.data.map((option) => {
        if(option.id == item.id){
          item.num = option.num
        }
      })
    ))
    if(type == 'division'){
      this.setState({divisionData: data})
    } else if(type == 'pop'){
      this.setState({popData: data})
    }
    this.setState({
      total: self.state.resData.total
    })
  }

  // 根据类型值获取当前类型传递进来的数组items
  _getItems(sort){
    let items
    this.props.gFormConfig.map((item) => {
      if(item.sort == sort){
        items = item.items
        return false
      }
    })
    return items
  }

  // 取消标签选择
  handleCancelSelect(item){
    console.log(item)
    const { config } = this.props
    if(item["checked"]){
      item.checked = !item.checked
    }
    // 这里的lv不能+1了 因为要取消当前以及当前层级的子集
    switch(item.sort){
      case 'division':
        const divisionData = this.getItem(parseFloat(parseInt(item.lv)), item.pid, this._getItems(item.sort))
        if(divisionData.length > 0){
          this.setState({divisionShow: true, divisionData: divisionData})
        }
      break
      case 'pop':
        const popData = this.getItem(parseFloat(parseInt(item.lv)), item.pid, this._getItems(item.sort))
        if(popData.length > 0){
          this.setState({popShow: true, popData: popData})
        }
      break
    }
    let selectedNew = []
    this.state.selectedArr.map((option, index) => {
      if(!(((option.lv > item.lv) && (option.sort == item.sort)) || (option.id == item.id))){
        selectedNew.push(option)
      }
    })
    this.setState({
      selectedArr: selectedNew
    })
  }

  // 搜索框的值发生改变的事件绑定
  handleChange(e){
    const newState = {}
    newState[e.target.name] = e.target.value
    this.setState(newState)
  }

  // 点击多选
  handelMultiSelect(type, val){
    switch(type){
      case 'divisionMultiShow':
        this.setState({divisionMultiShow: val})
      break
      case 'popMultiShow':
        this.setState({popMultiShow: val})
      break
    }
  }

  // 多选确定
  handleMultiOk(type, val, sort){
    let dataMap
    switch(sort){
      case 'division':
        dataMap = this.state.divisionData
        this.setState({divisionMultiShow: val})
      break
      case 'pop':
        dataMap = this.state.popData
        this.setState({popMultiShow: val})
      break
    }
    const selectedArr = this.state.selectedArr
    const arr = []
    dataMap.map((item) => {
      if(item.checked == true){
        // arr.push(item)
        let flag = true
        selectedArr.map((option) => {
          if(option.id == item.id){
            flag = false
          }
        })
        if(flag){
          arr.push(item)
        }
      }
    })
    // debugger
    this.setState({
      selectedArr : selectedArr.concat(arr)
    })
  }

  // checkbox的状态改变
  handleToggleCheckbox(option){
    return () => {
      option.checked = !option.checked;
      /*
        下面这行代码虽然没做任何的赋值等操作  但是因为设置了state 导致render的变化
        从而可以让CheckBox的选中状态发生变化 
      */  
      this.setState({
        divisionData: this.state.divisionData,
      })
    }
  }

  handleHight(sort){
    switch(sort){
      case 'division':
        this.setState({divisionHeight: !this.state.divisionHeight})
      break
      case 'pop':
        this.setState({popHeight: !this.state.popHeight})
      break
    }
  }

  // 公用方法  渲染待选择列表
  _getDataList(arr){
    return arr.rowData.map(item => (
        <span 
          key={item.id} 
          className="item" 
          data-id={item.id}
          data-sort={item.sort}
          data-lv={item.lv}
          data-num={item.num}
          onClick={this.handleSelect.bind(event, item, arr.items)}
          >
          <span className="name">{item.name}</span>
          <span className="num">({item.num})</span>
        </span>
      )
    )
  }

  // 公用方法  渲染多选列表
  _getCheckboxList(arr){
    const self = this
    return arr.map(item => (
        <label className="check-label" key={item.id}>
          <Checkbox 
            className="checkbox" 
            checked={item.checked}
            type="checkbox"
            value={item.id}
            data-sort={item.sort} 
            data-id={item.id} 
            data-lv={item.lv}
            onChange={self.handleToggleCheckbox(item)}>
          </Checkbox>
          <span>{item.name}({item.num})</span>
        </label>
      )
    )
  }

  // 公用方法 获取整行列表
  _getGroup(arg){
    return (
      arg.rowShow ?
        <div className={arg.height == false ? "group" : "group smallgroup"}>
          <Row gutter={16}>
            <Col lg={{ span: 2}} xs={{ span: 4}} style={{width: 80}}>
              {arg.label}
            </Col>
            <Col lg={{ span: 19}} xs={{ span: 15}} className="list-wrap">
              {this._getDataList(arg)}
            </Col>
            <Col lg={{ span: 3}} xs={{ span: 5}} style={{width: 100}}>
              <Button size="small" 
                onClick={this.handelMultiSelect.bind(event, arg.multiShowType, true)}
                >多选
              </Button>
              <Icon 
                className="rowSlide" 
                type={arg.height == false ? "down" : "up"} 
                onClick={this.handleHight.bind(event, arg.sort)} />
            </Col>
          </Row>
          {
            arg.multiShow ?
            <div className="check-wrap">
              <div className="checks">
                {this._getCheckboxList(arg.rowData)}
              </div>
              <div className="btns">
                <Button 
                  type="primary" 
                  size="small"
                  onClick={this.handleMultiOk.bind(event, arg.multiShowType, false, arg.sort)}
                  >确定
                </Button>
                <Button 
                  size="small" 
                  onClick={this.handelMultiSelect.bind(event, arg.multiShowType, false)}
                  >取消
                </Button>
              </div>
            </div>
            : null
          }
        </div>
      : null
    )
  }

  // 渲染行政区划模块
  getDivision(arg){
    return this._getGroup({
      rowShow: this.state.divisionShow,
      label: arg.label,
      rowData: this.state.divisionData,
      multiShow: this.state.divisionMultiShow,
      multiShowType: "divisionMultiShow",
      sort: arg.sort,
      items: arg.items,
      height: this.state.divisionHeight
    })
  }

  // 渲染户籍类别模块
  getPop(arg){
    return this._getGroup({
      rowShow: this.state.popShow,
      label: arg.label,
      rowData: this.state.popData,
      multiShow: this.state.popMultiShow,
      multiShowType: "popMultiShow",
      sort: arg.sort,
      items: arg.items,
      height: this.state.popHeight
    })
  }

  // 判断传送进来的参数类别
  getFormItem(item){
    switch (item.sort) {
      case 'division': 
        return this.getDivision(item)
      break
      case 'pop': 
        return this.getPop(item)
      break
    }
  }

  // 循环要渲染的模块
  renderRow(item, key){
    return (
      <div key={key}>
        {this.getFormItem(item)}
      </div>
    )
  }

  // 搜索区域点击提交事件
  handleGformSubmit(){
    // console.log(query)
    let arr = []
    this.state.selectedArr.map((item) => (arr.push(item.id)))
    console.log(arr.join())
    this.props.gFormSubmit({
      ids: arr.join(),
      keyword: this.state.keyword
    })
  }

  render() {

    // 已经选择的标签的视图
    const selectedArrList = this.state.selectedArr.map( item => (
        <Button 
          className="selected-btn"
          type="primary"
          key={item.id} 
          data-sort={item.sort} 
          data-id={item.id} 
          data-lv={item.lv}
          onClick={this.handleCancelSelect.bind(event, item)}
          >{item.name}({item.num})<Icon type="minus-circle" /></Button> 
      )
    )

    return (
      <div className="gform">
        <div className="gform-head clearfix">
          <span className="totle">{this.state.total}</span>
          <span className="selected-list">
            {selectedArrList}
          </span>
          <Input className="search-input" name="keyword" onChange={this.handleChange} type="text" />
          <Button type="primary" className="search-btn" onClick={this.handleGformSubmit}>搜索</Button>
        </div>

        <div className="groups">
          {
            this.props.gFormConfig.map((item, index) => this.renderRow(item, index))
          }
        </div>

      </div>
    )
  }
}
