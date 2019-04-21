import React from 'react';    import PropTypes from 'prop-types'
import classNames from 'classnames';

import RButton from 'react-bootstrap/lib/Button';

var expectedTypes = ["success", "warning", "danger", "info", "default", "primary", "link"];

function isBtnOfType(type) {
  for (var i = 0; i < expectedTypes.length; i++) {
    if (expectedTypes[i] === type) {
      return true;
    }
  }
  return false;
}

export default class Button extends React.Component {
  static propTypes = {
    xs: PropTypes.bool,
    sm: PropTypes.bool,
    lg: PropTypes.bool,
    rounded: PropTypes.bool,
    onlyOnHover: PropTypes.bool,
    retainBackground: PropTypes.bool,
    inverse: PropTypes.bool,
    outlined: PropTypes.bool,
  };

  render() {
    let props = {...this.props};

    if (props.close) {
      console.error('Button "close" prop has been deprecated in Rubix v4.0.0');
    }

    if (props.xs) {
      props.bsSize = 'xsmall';
      delete props.xs;
    }

    if (props.sm) {
      props.bsSize = 'small';
      delete props.sm;
    }

    if (props.lg) {
      props.bsSize = 'large';
      delete props.lg;
    }

    if (props.hasOwnProperty('bsStyle')
    && typeof props.bsStyle === 'string') {
      var styles = props.bsStyle.split(/\s|\,/mgi).filter((a) => a);
      for (var i = 0; i < styles.length; i++) {
        if (isBtnOfType(styles[i])) {
          props.bsStyle = styles[i];
        } else {
          props.className = classNames(props.className, 'btn-' + styles[i]);
          props.bsStyle = 'default';
        }
      }
    }

    if (props.retainBackground) {
      props.className = classNames(props.className, 'btn-retainBg');
    }

    if (props.rounded) {
      props.className = classNames(props.className, 'btn-rounded');
    }

    if (props.onlyOnHover) {
      props.className = classNames(props.className, 'btn-onlyOnHover');
    }

    if (props.inverse || props.retainBackground) {
      props.className = classNames(props.className, 'btn-inverse');
    }

    if (props.outlined || props.onlyOnHover || props.inverse || props.retainBackground) {
      props.className = classNames(props.className, 'btn-outlined');
    }

    delete props.retainBackground;
    delete props.rounded;
    delete props.onlyOnHover;
    delete props.inverse;
    delete props.outlined;

    return (
      <RButton {...props} />
    );
  }
}
