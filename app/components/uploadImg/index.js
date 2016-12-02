import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Upload, Icon, Modal } from 'antd';

export default class uploadImg extends Component {

  constructor(props) {
    super(props)
    this.state = {
      priviewVisible: false,
      fileList: [],
      isAdding: false,
    }
    this.onChange = this.onChange.bind(this)
    this.onRemove = this.onRemove.bind(this)
    this.onPreview = this.onPreview.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
  }

  componentWillMount() {
    this.setState({
      fileList: this.props.fileList ? this.props.fileList : [],
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fileList && !this.state.isAdding) {
      this.setState({
        fileList: nextProps.fileList,
      })
    }
  }

  onChange(value) {
    if (value.file.status === 'uploading') {
      this.props.onUploading && this.props.onUploading()
      this.setState({
        fileList: value.fileList,
        isAdding: true,
      })
    }
    if (value.file.status === 'done') {
      this.props.uploadComplete && this.props.uploadComplete(value.file.response, value);
    }
  }

  onRemove(file) {
    const list = this.state.fileList.filter(item => item.uid !== file.uid)
    const data = file.url ? file.url.split('=')[1] : file.response.data
    this.props.onRemove && this.props.onRemove(data)
    this.setState({
      fileList: list,
    })
  }

  onPreview(file) {
    this.setState({
      priviewImage: file.url ? file.url : file.thumbUrl,
      priviewVisible: true,
    })
  }

  handleCancel() {
    this.setState({
      priviewVisible: false,
    })
  }

  render() {
    const { action, data, listType } = this.props
    return (
      <div className="clearfix">
        <Upload
          ref={(c) => { this.upload = c }}
          action={action}
          data={data}
          listType={listType}
          onChange={this.onChange}
          fileList={this.state.fileList}
          onRemove={this.onRemove}
          onPreview={this.onPreview}
        >
          <Icon type="plus" />
          <div className="ant-upload-text">上传图片</div>
        </Upload>
        <Modal visible={this.state.priviewVisible} footer={null}
          onCancel={this.handleCancel}
        >
          <img src={this.state.priviewImage} />
        </Modal>
      </div>
    )
  }
}
