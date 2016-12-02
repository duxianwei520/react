import React, { Component } from 'react'
import echarts from 'echarts'

export default class Pie extends Component {
  constructor(props) {
    super(props)
    this._initChart = this._initChart.bind(this)
    this._getChartData = this._getChartData.bind(this)
  }

  componentDidMount() {
    this._initChart()
  }

  componentWillReceiveProps(nextProps) {
    const _self = this;
    if (nextProps.data.length > 0 && nextProps.refresh && nextProps.data[0]) {
      setTimeout(() => {
        _self._initChart();
      }, 0);
    }
  }

  _initChart() {
    const _self = this
    const theme = _self.props.theme ? _self.props.theme : 'macarons'
    const inRadius = _self.props.inRadius ? _self.props.inRadius : '40'
    const outRadius = _self.props.outRadius ? _self.props.outRadius : '60'
    const textStyle = _self.props.textStyle ? _self.props.textStyle : { fontSize: '20', color: '#FF444F' }
    const _pie = echarts.init(_self.pie, theme) // 圆环实例
    const option = {
      title: {
        show: true,
        text: _self.props.title ? _self.props.title : '饼图',
        x: 'center',
      },
      tooltip: {
        show: _self.props.tooltipShow ? _self.props.tooltipShow : true,
        trigger: 'item',
        formatter: '{b} : {c} %',
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: [],
      },
      calculable: false,
      series: [
        {
          type: 'pie',
          radius: [inRadius, outRadius],
          itemStyle: {
            normal: {
              label: {
                show: !_self.props.data.length,
                position: 'center',
                textStyle: textStyle,
              },
              labelLine: {
                show: false,
              },
            },
            emphasis: {
              color: 'rgba(0,0,0,0)',
            },
          },
          data: _self._getChartData(),
        },
      ],
    };
    _pie.setOption(option);
  }
  _getChartData() {
    const _self = this
    const defaultStyle = {
      normal: {
        color: '#FFFFFF',
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
      emphasis: {
        color: 'rgba(0,0,0,0)',
      },
    };
    // 默认的圆弧样式
    const itemStyle = {
      normal: {
        color: _self.props.chartColor ? _self.props.chartColor : '#FF444F',
        label: {
          show: true,
          formatter: function (params) {
            return `${params.value}%`
          },
        },
        labelLine: {
          show: false,
        },
      },
      emphasis: {
        color: 'rgba(0,0,0,0)',
      },
    };
    // 用于绘制圆环
    const data = []
    let i
    if (_self.props.data.length > 0 && _self.props.data[0]) {
      // 多个数据
      if (_self.props.data.length > 1) {
        for (i = 0; i < _self.props.data.length; i++) {
          data.push({
            name: _self.props.data[i].name,
            value: parseInt(_self.props.data[i].value, 10),
          })
        }
      } else { // 只有一条数据
        data.push({
          name: _self.props.data[0].name,
          value: parseInt(_self.props.data[0].value, 10),
          itemStyle: itemStyle,
        });
        data.push({
          name: '其它',
          value: 100 - parseInt(_self.props.data[0].value, 10),
          itemStyle: defaultStyle,
        });
      }
    } else { // 无数据
      data.push({
        name: '暂无数据',
        value: 0,
        itemStyle: defaultStyle,
      });
      data.push({
        name: '其它',
        value: 100,
        itemStyle: defaultStyle,
      });
    }
    return data;
  }

  render() {
    const _self = this;
    const width = _self.props.width ? _self.props.width : '150px'
    const height = _self.props.height ? _self.props.height : '150px'
    return (
      <div className="echart-wrap">
        <div ref={(c) => { this.pie = c; }} style={{ height: height, width: width }} />
      </div>
    )
  }
}
