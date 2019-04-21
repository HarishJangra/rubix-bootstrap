import React from 'react';    import PropTypes from 'prop-types'
import BProgressBar from './BProgressBar';

export default class ProgressBar extends React.Component {
  static propTypes = {
    value: PropTypes.number
  };

  render() {
    let props = { ...this.props };

    if (props.value) {
      props.now = props.value;
      delete props.value;
    }

    return <BProgressBar {...props} />;
  }
}
