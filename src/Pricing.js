import React from 'react';    import PropTypes from 'prop-types'
import classNames from 'classnames';

import Col from './Col';
import Row from './Row';
import Grid from './Grid';

export default class PricingTableContainer extends React.Component {
  render() {
    let props = {
      ...this.props,
      className: classNames('container-sm-height', this.props.className)
    };

    return (
      <Grid {...props}>
        <Row className='row-sm-height'>
          {this.props.children}
        </Row>
      </Grid>
    );
  }
}

export class PricingTable extends React.Component {
  static propTypes = {
    preferred: PropTypes.bool
  };

  render() {
    let classes = classNames({
      'col-sm-height': true,
      'pricing-table': true,
      'preferred': this.props.preferred
    });

    let props = {
      xs: 12,
      ...this.props,
      className: classes.trim()
    };

    delete props.preferred;

    return (
      <Col {...props}>
        {this.props.children}
      </Col>
    );
  }
}

export class PricingTableHeader extends React.Component {
  render() {
    let props = {
      ...this.props,
      className: classNames('pricing-table-header text-center text-uppercase', this.props.className)
    };

    return (
      <div {...props}>
        <h3>{this.props.children}</h3>
      </div>
    );
  }
}

export class PricingTablePrice extends React.Component {
  render() {
    let props = {
      ...this.props,
      className: classNames('pricing-table-price text-center text-uppercase', this.props.className)
    };

    return (
      <div {...props}>
        <h2>{this.props.children}</h2>
      </div>
    );
  }
}

export class PricingTableBody extends React.Component {
  render() {
    let props = {
      ...this.props,
      className: classNames('pricing-table-body text-center', this.props.className)
    };

    return (
      <div {...props}>
        {this.props.children}
      </div>
    );
  }
}

export class PricingFeature extends React.Component {
  render() {
    let props = {
      ...this.props,
      className: classNames('pricing-table-feature text-center', this.props.className)
    };

    return (
      <div {...props}>
        {this.props.children}
      </div>
    );
  }
}


export class PricingButtonContainer extends React.Component {
  render() {
    let props = {
      ...this.props,
      className: classNames('pricing-btn-container text-center', this.props.className)
    };

    return (
      <div {...props}>
        {this.props.children}
      </div>
    );
  }
}
