import React from 'react';    import PropTypes from 'prop-types'
import classNames from 'classnames';
import BTable from 'react-bootstrap/lib/Table';

export default class Table extends React.Component {
  render() {
    let props = {
      ...this.props,
      className: classNames(this.props.className, {
        'table-collapsed': this.props.collapsed,
        'table-middle-align': this.props.alignMiddle,
      })
    };

    delete props.collapsed;
    delete props.alignMiddle;

    return (
      <BTable { ...props } />
    );
  }
}
