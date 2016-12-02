import React, { Component } from 'react'
import Lightbox from 'react-images'
// 图片详情组件
// props: imgSrc

export default class openPic extends Component {
  constructor(props) {
    super(props)
    this.state = { lightboxIsOpen: false }
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openPic = this.openPic.bind(this)
  }
  closeLightbox() {
    this.setState({ lightboxIsOpen: false })
  }
  openPic() {
    this.setState({ lightboxIsOpen: true })
  }
  render() {
    return (
      <div>
        <img src={this.props.imgSrc} width="100%" onClick={this.openPic} />
        <Lightbox
          images={[
            { src: this.props.imgSrc || '' },
          ]}
          isOpen={this.state.lightboxIsOpen}
          onClose={this.closeLightbox}
        />
      </div>
    )
  }
}
