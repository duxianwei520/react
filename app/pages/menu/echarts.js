
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import echarts from 'echarts'

@connect((state, props) => ({
  config: state.config,
}))
export default class app extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // data: {},
    }
  }

  componentDidMount() {
    // this.loadChart()
    setTimeout(() => {
      this.loadChart()
    }, 500)
  }

  loadChart() {
    // console.log(this.chart)
    this.chartObj = echarts.init(this.chart)
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        x: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' },
          ],
        },
      ],
    };
    this.chartObj.setOption(option)
  }

  render() {
    return (
      <div className="page">
        <div className="page" ref={c => this.chart = c} />
      </div>
    )
  }
}
