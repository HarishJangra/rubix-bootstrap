import React from 'react';    import PropTypes from 'prop-types'
import classNames from 'classnames';

import Icon from './Icon';

export class TimelineView extends React.Component {
  static propTypes = {
    centered: PropTypes.bool,
    withHeader: PropTypes.bool
  };

  render() {
    var classes = classNames({
      'rubix-timeline-view': true,
      'rubix-timeline-centered': this.props.centered || false,
      'rubix-timeline-with-header': this.props.withHeader || false,
      'rubix-timeline-normal': !this.props.withHeader
    }, this.props.className);

    var props = {
      ...this.props,
      centered: null,
      withHeader: null,
      className: classes.trim()
    };

    delete props.centered;
    delete props.withHeader;

    return (
      <div {...props}>
        {this.props.children}
      </div>
    );
  }
}

export class TimelineItem extends React.Component {
  render() {
    var props = {
      ...this.props,
      className: classNames('rubix-timeline-item', this.props.className)
    };

    return (
      <div {...props}>
        {this.props.children}
      </div>
    );
  }
}

export class TimelineHeader extends React.Component {
  render() {
    var props = {
      ...this.props,
      className: classNames('rubix-timeline-header', this.props.className)
    };

    return (
      <div {...props}>
        {this.props.children}
      </div>
    );
  }
}

export class TimelineIcon extends React.Component {
  render() {
    var props = {
      ...this.props,
      className: classNames('rubix-timeline-icon', this.props.className)
    };

    return (
      <Icon {...props} />
    );
  }
}

export class TimelineAvatar extends React.Component {
  render() {
    var props = {
      width: 30,
      height: 30,
      ...this.props,
      className: classNames('rubix-timeline-avatar', this.props.className),
      style: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 100,
        padding: 2,
        position: 'absolute',
        top: 0
      },
    };

    return (
      <img {...props} />
    );
  }
}

export class TimelineTitle extends React.Component {
  render() {
    var props = {
      ...this.props,
      className: classNames('rubix-timeline-title', this.props.className)
    };

    return (
      <div {...props}>
        {this.props.children}
      </div>
    );
  }
}

export class TimelineBody extends React.Component {
  render() {
    var props = {
      ...this.props,
      className: classNames('rubix-timeline-body', this.props.className)
    };

    return (
      <div {...props}>
        {this.props.children}
      </div>
    );
  }
}
