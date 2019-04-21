import React from 'react';    import PropTypes from 'prop-types'
import BAlert from 'react-bootstrap/lib/Alert';

export default class Alert extends React.Component {
  static propTypes = {
    success: PropTypes.bool,
    info: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
    dismissible: PropTypes.bool,
  };

  constructor(...args) {
    super(...args);

    this.state = { alertVisible: true };
  }

  handleAlertDismiss() {
    this.setState({alertVisible: false});
  }

  render() {
    let props = { ...this.props };

    if (props.success) {
      props.bsStyle = 'success';
      delete props.success;
    }

    if (props.info) {
      props.bsStyle = 'info';
      delete props.info;
    }

    if (props.warning) {
      props.bsStyle = 'warning';
      delete props.warning;
    }

    if (props.danger) {
      props.bsStyle = 'danger';
      delete props.danger;
    }

    if (!props.dismissible) {
      delete props.dismissible;
      return <BAlert {...props} />;
    }

    if (this.state.alertVisible) {
      delete props.dismissible;
      return <BAlert {...props} onDismiss={::this.handleAlertDismiss} />;
    }

    return null;
  }
}
