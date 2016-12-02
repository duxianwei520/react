import React, { Component } from 'react'
import echarts from 'echarts'

export default class StackedBar extends Component {
  constructor(props) {
    super(props)
    this._initCharts = this._initCharts.bind(this)
    this._getChartData = this._getChartData.bind(this)
  }

  componentDidMount() {
    this._initCharts()
  }

  componentWillReceiveProps(nextProps) {
    const _self = this;
    if (nextProps.yAxis.length > 0 && nextProps.refresh) {
      setTimeout(() => {
        _self._initCharts();
      }, 0);
    }
  }

  _initCharts() {
    const _self = this
    const data = _self._getChartData();
    // 图表高度自适应
    // $(_self.refs.bar.getDOMNode()).css("height", parseInt(
    // this.props.height)*this.props.yAxis.length+120);
    const theme = _self.props.theme ? _self.props.theme : 'macarons'
    const _bar = echarts.init(_self.bar, theme);
    const option = {
      title: {
        show: true,
        text: _self.props.title ? _self.props.title : '堆积条形图',
        x: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow',        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params, ticket, callback) {
          let res = ''
          let sum = 0
          for (let i = 0; i < params.length; i++) {
            res += `<div>${params[i].seriesName}:${params[i].data}</div>`;
            sum += params[i].data;
          }
          res = `<b>任务总数：${sum}</b>${res}`;
          return res;
        },
      },
      legend: {
        left: 0,
        top: 0,
        orient: 'vertical',
        data: data.legend,
      },
      calculable: false,
      grid: {
        x: 120,
        x2: 120,
      },
      xAxis: [
        {
          type: 'value',
          position: 'top',
        },
      ],
      yAxis: [
        {
          type: 'category',
          data: _self.props.yAxis,
        },
      ],
      series: data.series,
    };
    _bar.setOption(option)
  }
  _getChartData() {
    const series = []
    const legends = []
    let i
    let item
    for (i = 0; i < this.props.data.length; i++) {
      item = this.props.data[i]
      series.push({
        name: item.name,
        data: item.data,
        type: 'bar',
        stack: 'group1',
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'insideRight',
                            // 数据为"0"， 则不绘制label
              formatter: function (params, ticket, callback) {
                return params.data === 0 ? '' : params.data;
              },
            },
          },
        },
      })
      legends.push(item.name)
    }
    // eslint-disable-next-line no-unreachable
    return { series: series, legend: legends };
  }

  render() {
    const _self = this;
    const width = _self.props.width ? _self.props.width : '100%'
    const height = _self.props.height ? _self.props.height : '200px'
    return (
      <div style={{ marginTop: '-15px' }}>
        <div ref={(c) => { this.bar = c }} style={{ height: height, width: width }} />
      </div>
    )
  }
}
