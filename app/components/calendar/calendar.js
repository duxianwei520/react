import React, {
  Component,
} from 'react'
import {
  DatePicker,
  Button,
} from 'antd'
import {
  getStepDate,
} from '../../utils'
import '../index.less'

const RangePicker = DatePicker.RangePicker

export default class Calendar extends Component {
  constructor(props) {
    super(props)
    this.WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    this.DATE_OPTION = [{
      name: '今天',
      min: getStepDate(0),
      max: getStepDate(0),
    }, {
      name: '昨天',
      min: getStepDate(-1),
      max: getStepDate(-1),
    }, {
      name: '7天',
      min: getStepDate(-7),
      max: getStepDate(0),
    }]
    this.state = {
      isOpen: false,
      dateMin: this.props.defaultValue ? this.props.defaultValue[0] : getStepDate(0),
      dateMax: this.props.defaultValue ? this.props.defaultValue[1] : getStepDate(0),
    }
    this._handleOpenDateSelectPanel = this._handleOpenDateSelectPanel.bind(this)
    this._handleQuickSelectDate = this._handleQuickSelectDate.bind(this)
    this._handleDateChange = this._handleDateChange.bind(this)
  }

  _handleOpenDateSelectPanel() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
    // 日期面板选择
  _handleQuickSelectDate(e) {
    const dateMin = e.currentTarget.getAttribute('data-min')
    const dateMax = e.currentTarget.getAttribute('data-max')
    const date = {}
    date[`${this.props.name}Min`] = dateMin;
    date[`${this.props.name}Max`] = dateMax;
    this.setState({
      dateMin: dateMin,
      dateMax: dateMax,
      isOpen: false,
    }, () => {
      this.props.onChange(date);
    });
  }
    // 日期范围选择
  _handleDateChange(value, dateString) {
    const date = {};
    date[`${this.props.name}Min`] = dateString[0];
    date[`${this.props.name}Max`] = dateString[1];
    this.setState({
      dateMin: dateString[0],
      dateMax: dateString[1],
      isOpen: false,
    }, () => {
      this.props.onChange(date);
    });
  }

  render() {
    const _self = this
    return (
      <div>
        <div className="calendar-icon" onClick={_self._handleOpenDateSelectPanel} >
          <div className="text-center">{_self.WEEK[new Date(_self.state.dateMin).getDay()]}</div>
          <div className="text-2x text-center">{new Date(_self.state.dateMin).getDate()}</div>
        </div>
        <div className={`calendar-panel-wrap ${_self.state.isOpen ? '' : 'hidden'}`}>
          <div className="bg-primary text-bold" style={{ padding: '10px' }}>快捷日期</div>
          <div className="mar-all text-center">
            {
              _self.DATE_OPTION.map((date, index) =>
                // eslint-disable-next-line max-len,no-unused-expressions
                <Button className={`mar-lft btn btn-primary ${(_self.state.dateMin === date.min && _self.state.dateMax === date.max) ? 'btn-success' : ''}`}
                  data-min={date.min}
                  data-max={date.max}
                  key={`date-op-${index}`}
                  onClick={_self._handleQuickSelectDate}
                >{date.name}</Button>
              )
            }
          </div>
          <div className="bg-gray-light text-bold" style={{ padding: '10px' }}>自选日期</div>
          <div className="mar-all text-center">
            <RangePicker defaultValue={[_self.state.dateMin, _self.state.dateMax]}
              format="yyyy-MM-dd"
              onChange={this._handleDateChange}
            />
          </div>
        </div>
      </div>
    )
  }
}
