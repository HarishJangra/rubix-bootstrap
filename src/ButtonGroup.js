import React from 'react'; import PropTypes from 'prop-types'
import classNames from 'classnames';

import RButtonGroup from 'react-bootstrap/lib/ButtonGroup';

export default class ButtonGroup extends React.Component {
  static propTypes = {
    xs: PropTypes.bool,
    sm: PropTypes.bool,
    lg: PropTypes.bool,
  };

  render() {
    var props = { ...this.props };

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

    if (props.bsSize) {
      props.children = React.Children.map(props.children, (child) => {
        return React.cloneElement(child, {
          bsSize: props.bsSize
        });
      });
    }

    return (
      <RButtonGroup {...props} />
    );
  }
}
