import React from 'react';    import PropTypes from 'prop-types'
import classNames from 'classnames';

export default class Tag extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    color: PropTypes.string,
  };

  render() {
    let { color, className } = this.props;
    color = color || "darkgreen45";
    let props = {
      ...this.props,
      href: this.props.href || "#",
      className: classNames(className, {
        'left-tag': true,
        'fg-hover-white': true,
        'bg-lightgray50': true,
        'border-lightgray50': true,
        'fg-text': true
      }, `border-hover-${color}`, `bg-hover-${color}`)
    };

    delete props.color;

    return (
      <a {...props} />
    );
  }
}
