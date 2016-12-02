import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllSectionList } from 'actions/common'
import { Cascader } from 'antd'

@connect(
    (state, props) => ({
      config: state.config,
      allSectionList: state.allSectionList,
    })
)

export default class cityCascader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [],
    }
    this.onChange = this.onChange.bind(this)
  }

  componentWillMount() {
    const cityIds = []
    this.props.config.CITIES.map((city) => {
      cityIds.push(city.cityId)
    })
    this.props.dispatch(fetchAllSectionList({ cityIds: cityIds.toString() }))
  }

  onChange(value) {
    const filedValue = {}
    filedValue.cityId = value[0] ? value[0] : ''
    filedValue.sectionId = value[1] ? value[1] : ''
    filedValue.regionId = value[2] ? value[2] : ''
    filedValue.sectionRegions = this.getSectionValue(value[0], value[1])
    filedValue.selectRegions = value[2] ? value[2] : ''
    this.props.onFieldsChange(filedValue)
    value.length === 1 && this.props.onCityChange && this.props.onCityChange(value[0])
  }

  getSectionValue(cityId, sectionId) {
    const sectionRegions = []
    sectionId && this.props.allSectionList.list[cityId].map((section) => {
      if (section.sectionId === sectionId) {
        section.regionList.map((region) => {
          sectionRegions.push(region.regionId);
        })
      }
    })
    return sectionRegions.toString();
  }
  // eslint-disable-next-line class-methods-use-this
  initSection(data) {
    if (data) {
      const sectionList = []
      data.length && data.map((section) => {
        const regionList = []
        section.regionList.map((region) => {
          regionList.push({
            value: region.regionId,
            label: region.regionName,
          })
        })
        sectionList.push({
          value: section.sectionId,
          label: section.sectionName,
          children: regionList,
        })
      })
      return sectionList
    }
    return []
  }

  getOptions() {
    const options = []
    const self = this
    this.props.config.CITIES.map((city) => {
      options.push({
        value: city.cityId,
        label: city.cityName,
        children: self.initSection(self.props.allSectionList.list[city.cityId]),
      })
    })
    return options
  }

  render() {
    const options = this.getOptions();
    return (<Cascader options={options}
      defaultValue={this.props.defaultValue}
      changeOnSelect onChange={this.onChange}
    />)
  }
}
