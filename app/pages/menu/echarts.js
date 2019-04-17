
import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import echarts from 'echarts'

// 颜色
const lightBlue = {
  type: 'linear',
  x: 0,
  y: 0,
  x2: 0,
  y2: 1,
  colorStops: [{
    offset: 0,
    color: 'rgba(41, 121, 255, 1)', // 0% 处的颜色
  }, {
    offset: 1,
    color: 'rgba(0, 192, 255, 1)', // 100% 处的颜色
  }],
  globalCoord: false, // 缺省为 false
}
// 纹理
const piePane = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAKElEQVQ4jWP8//8/AwXgPxMluhkYGBhGDRg1YNQAKhnAwsDAQFF+BgBtSwUd6uvSywAAAABJRU5ErkJggg=='
const piePatternImg = new Image();
piePatternImg.src = piePane;
// 图标
const cpu = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NzgyQTBDQTI3MjcxMUU4ODA3MEFBRjc3RkNBNDJBOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NzgyQTBDQjI3MjcxMUU4ODA3MEFBRjc3RkNBNDJBOSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3ODJBMEM4MjcyNzExRTg4MDcwQUFGNzdGQ0E0MkE5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ3ODJBMEM5MjcyNzExRTg4MDcwQUFGNzdGQ0E0MkE5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+n1oX5AAACiRJREFUeNrsXUuIHUUU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'
const memory = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NkZDRThCRDI3MjcxMUU4OTI4QUM3NDRGMEMxNjdDMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NkZDRThCRTI3MjcxMUU4OTI4QUM3NDRGMEMxNjdDMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2RkNFOEJCMjcyNzExRTg5MjhBQzc0NEYwQzE2N0MxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ2RkNFOEJDMjcyNzExRTg5MjhBQzc0NEYwQzE2N0MxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+2qH1MwAACnBJREFUeNrsXWuoVUUU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'
const disk = 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NjczMjI5MjI3MjcxMUU4OTIzNUNGREYwREM2MEQ2RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0NjczMjI5MzI3MjcxMUU4OTIzNUNGREYwREM2MEQ2RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ2NzMyMjkwMjcyNzExRTg5MjM1Q0ZERjBEQzYwRDZEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ2NzMyMjkxMjcyNzExRTg5MjM1Q0ZERjBEQzYwRDZEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+e59NdAAACT1JREFUeNrsXTuPHEUQ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'

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
        show: false,
      },
      grid: {
        top: '20%',
        left: '5%',
        right: '5%',
        bottom: '15%',
      },
      xAxis: {
        data: ['平均CPU\n利用率', '平均内存\n利用率', '平均硬盘\n利用率'],
        offset: 15,
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          color: '#fff',
          fontSize: 14,
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: [{
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          padding: 10,
          color: '#2979ff',
          fontSize: 14,
          formatter: '{c}%',
        },
        itemStyle: {
          color: lightBlue,
        },
        barWidth: '40%',
        data: [49, 80, 67],
        z: 10,
      }, {
        type: 'bar',
        barGap: '-100%',
        itemStyle: {
          color: {
            image: piePatternImg,
            repeat: 'repeat',
          },
          opacity: 0.05,
        },
        barWidth: '40%',

        data: [100, 100, 100],
        z: 5,
      }, {
        type: 'bar',
        barGap: '-100%',
        itemStyle: {
          color: '#536dfe',
          opacity: 0.2,
        },
        barWidth: '40%',

        data: [100, 100, 100],
        z: 5,
      }, {
        name: 'glyph',
        type: 'pictorialBar',
        barGap: '-100%',
        symbolPosition: 'end',
        symbolSize: 64,
        symbolOffset: [0, '-150%'],
        data: [{
          value: 100,
          symbol: cpu,
        }, {
          value: 100,
          symbol: memory,
        }, {
          value: 100,
          symbol: disk,
        }],
      }],
      backgroundColor: '#190c12',
    }
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
