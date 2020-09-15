import React from 'react';    import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import BNavDropdown from './BNavDropdown';

import isBrowser from './isBrowser';
import isTouchDevice from './isTouchDevice';

var requestFrame = null, rAF = () => {}, cAF = () => {};

if (isBrowser()) {
  requestFrame = require('request-frame');
  rAF = requestFrame('request');
  cAF = requestFrame('cancel');
}

const expectedTypes = ["success","warning","danger","info","default","primary","link"];

function isBtnOfType(type) {
  for (var i = 0; i < expectedTypes.length; i++) {
    if (expectedTypes[i] === type) {
      return true;
    }
  }
  return false;
}

export var NavDropdownHOC = ComposedComponent => class extends React.Component {
  static displayName = 'NavDropdown';

  static propTypes = {
    xs: PropTypes.bool,
    sm: PropTypes.bool,
    lg: PropTypes.bool,
  };

  render() {
    var props = {...this.props};

    if (this.props.hasOwnProperty('xs')) {
      props.bsSize = 'xsmall';
      delete props.xs;
    }

    if (this.props.hasOwnProperty('sm')) {
      props.bsSize = 'small';
      delete props.sm;
    }

    if (this.props.hasOwnProperty('lg')) {
      props.bsSize = 'large';
      delete props.lg;
    }

    if (this.props.hasOwnProperty('bsStyle')
    && typeof this.props.bsStyle === 'string') {
      var styles = this.props.bsStyle.split(/\s|\,/mgi).filter((a) => a);
      for (var i = 0; i < styles.length; i++) {
        if (styles[i] === 'link') {
          props.bsClass = 'menu-default dropdown';
        } else {
          props.bsClass = 'menu-' + styles[i] + ' dropdown';
        }
        if (isBtnOfType(styles[i])) {
          props.bsStyle = styles[i];
        } else {
          props.bsStyle = 'default';
        }
      }
    }

    if (!props.bsStyle) {
      props.bsStyle = 'default';
    }

    if (!props.bsClass) {
      props.bsClass = 'menu-default dropdown';
    }

    if (props.hasOwnProperty('dropup')) {
      props.bsClass = 'dropup ' + props.bsClass;
    }

    delete props.dropup;

    return (
      <ComposedComponent buttonProps={props} />
    );
  }
}

@NavDropdownHOC
export var NavDropdownHoverHOC = ComposedComponent => class extends React.Component {
  static displayName = 'NavDropdownHover';

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this._eventObject = {
      handleEvent: this._handleOver.bind(this),
      name: 'NavDropdownHoverEvent',
    };

    this._timeout = null;
  }

  _isWithinDropdown(node) {
    var componentNode = ReactDOM.findDOMNode(this._node);
    return (componentNode && componentNode.contains(node)) || componentNode === node;
  }

  _handleOver(e) {
    if (this._isWithinDropdown(e.target)) {
      cAF(this._timeout);
      this.setState({ open: true });
    } else {
      this._timeout = rAF(() => {
        this.setState({ open: false });
      });
    }
  }

  _onToggle(isOpen) {
    this.setState({ open: isOpen });
  }

  componentWillUnmount() {
    if (!isTouchDevice()) {
      document.removeEventListener('mouseover', this._eventObject);
    }
  }

  componentDidMount() {
    if (!isTouchDevice()) {
      rAF(() => {
        document.addEventListener('mouseover', this._eventObject);
      });
    }
  }

  render() {
    return (
      <ComposedComponent ref={ (node) => this._node = node }
                         onToggle={::this._onToggle}
                         open={this.state.open}
                         buttonProps={this.props.buttonProps} />
    );
  }
}

@NavDropdownHoverHOC
export class NavDropdownHover extends React.Component {
  render() {
    return (
      <BNavDropdown open={this.props.open}
                    onToggle={this.props.onToggle}
                    {...this.props.buttonProps} />
    );
  }
}

@NavDropdownHOC
export default class NavDropdown extends React.Component {
  render() {
    return <BNavDropdown {...this.props.buttonProps} />;
  }
}
