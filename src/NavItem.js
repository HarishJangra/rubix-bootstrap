import React from 'react';    import PropTypes from 'prop-types'
import classNames from 'classnames';
import BNavItem from 'react-bootstrap/lib/NavItem';

export default class NavItem extends React.Component {
  static propTypes = {
    divider: PropTypes.bool,
  };

  render() {
    let props = {...this.props};

    if (props.divider) {
      props.className = classNames(props.className, 'divider');

      return <li className={props.className} />;
    }

    return <BNavItem {...props} />
  }
}
