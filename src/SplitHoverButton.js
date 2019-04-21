import React from 'react';    import PropTypes from 'prop-types'
import RSplitButton from './RSplitButton';

import { DropdownHoverButtonHOC } from './DropdownButton';

@DropdownHoverButtonHOC
export default class SplitHoverButton extends React.Component {
  render() {
    return (
      <RSplitButton open={this.props.open}
                    onToggle={this.props.onToggle}
                    {...this.props.buttonProps} />
    );
  }
}
