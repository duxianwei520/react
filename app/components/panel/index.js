import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import QueueAnim from 'rc-queue-anim';

export default class Panel extends Component {

  render() {
    const {
            classNames,
            color,
            onlyBordered,
            title, // eslint-disable-line no-unused-vars
            children,
            className, // eslint-disable-line no-unused-vars
            colorful,
            bordered,
            control, // eslint-disable-line no-unused-vars
            footer,
            ...others,
        } = this.props;

    const _color = ` panel${onlyBordered ? '-bordered' : ''}-${color}`;
    const classes = [cx(`panel${_color}`, {
      'panel-colorful': colorful,
      'panel-bordered': bordered,
    }), classNames].join(' ');

    let foot;
    if (footer) {
      foot = <div className="panel-footer">{this.props.footer}</div>
    }
    return (
      <QueueAnim>
        <div {...others} key={1} className={classes} style={this.props.style}>
          <div className="panel-body">{children}</div>
          {foot}
        </div>
      </QueueAnim>
    );
  }
}

Panel.propTypes = {
  title: PropTypes.string,
  bordered: PropTypes.bool,
  onlyBordered: PropTypes.bool,
  color: PropTypes.string,
  colorful: PropTypes.bool,
}
