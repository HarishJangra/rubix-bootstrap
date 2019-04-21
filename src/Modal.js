import React from 'react';    import PropTypes from 'prop-types'
import BModal from 'react-bootstrap/lib/Modal';
import ModalDialog from './ModalDialog';

export default class Modal extends React.Component {
  static propTypes = {
    sm: PropTypes.bool,
    lg: PropTypes.bool,
  };

  render() {
    let props = {...this.props};

    if (props.sm) {
      props.bsSize = 'small';
      delete props.sm;
    }

    if (props.lg) {
      props.bsSize = 'large';
      delete props.lg;
    }

    return <BModal {...props} />;
  }
}


let keys = Object.keys(BModal);
let skipKeys = ['displayName', 'propTypes', 'childContextTypes', 'getDefaultProps', 'defaultProps'];
for (var i = 0; i < keys.length; i++) {
  let key = keys[i];
  if (BModal.hasOwnProperty(key) && (skipKeys.indexOf(key) < 0)) {
    Modal[key] = BModal[key];
  }
}

Modal.Dialog = ModalDialog;
