import React from 'react';    import PropTypes from 'prop-types'
import RDropdownButton from 'react-bootstrap/lib/DropdownButton';

import { DropdownHoverButtonHOC } from './DropdownButton';

@DropdownHoverButtonHOC
export default class DropdownHoverButton extends React.Component {
  render() {
    return (
      <RDropdownButton open={this.props.open}
                       onToggle={this.props.onToggle}
                       {...this.props.buttonProps} />
    );
  }
}
