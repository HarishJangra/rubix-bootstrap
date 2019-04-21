import React from 'react';    import PropTypes from 'prop-types'
import BTabPane from 'react-bootstrap/lib/TabPane';

import isBrowser from './isBrowser';

export default class TabPane extends React.Component {
  onEntering() {
    if (isBrowser()) {
      if (window.hasOwnProperty('Rubix')) {
        Rubix.redraw();
      }
    }

    if (this.props.onEntering && typeof this.props.onEntering === 'function') {
      this.props.onEntering();
    }
  }

  render() {
    let props = {
      ...this.props,
      onEntering: ::this.onEntering
    };

    return <BTabPane {...props} />;
  }
}
