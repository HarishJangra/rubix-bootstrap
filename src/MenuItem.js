import React from 'react';    import PropTypes from 'prop-types'
import classnames from 'classnames';
import BMenuItem from 'react-bootstrap/lib/MenuItem';

export default class MenuItem extends React.Component {
  render() {
    if (this.props.noHover) {
      let props = {
        ...this.props,
      };

      delete props.noHover;
      delete props.eventKey;

      return (
        <li role='presentation' { ...props } />
      );
    }

    return <BMenuItem { ...this.props } />;
  }
}
