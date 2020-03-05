import React from 'react'; import PropTypes from 'prop-types'
import classNames from 'classnames';
import BWell from 'react-bootstrap/lib/Well';

export default class Well extends React.Component {
  static propTypes = {
    sm: PropTypes.bool,
    lg: PropTypes.bool,
    noMargin: PropTypes.bool,
  };

  render() {
    let props = { ...this.props };

    if (props.hasOwnProperty('sm')) {
      props.bsSize = 'sm';
      delete props.sm;
    }

    if (props.hasOwnProperty('lg')) {
      props.bsSize = 'lg'
      delete props.lg;
    }

    if (props.hasOwnProperty('noMargin')) {
      props.style = props.style || {};
      props.style.margin = 0;
    }

    return <BWell {...props} />;
  }
}
