import React from 'react';    import PropTypes from 'prop-types'

export default class ProgressGroup extends React.Component {
  render() {
    return (
      <div className='progress'>
        {this.props.children}
      </div>
    );
  }
}
