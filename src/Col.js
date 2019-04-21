import classNames from 'classnames';
import React from 'react';    import PropTypes from 'prop-types'
import BCol from 'react-bootstrap/lib/Col';

const breakpoints = ['xs', 'sm', 'md', 'lg'];
const directions = ['left', 'right', 'top', 'bottom'];

function ucfirst(str) {
  return typeof str !="undefined" ? (str += '', str[0].toUpperCase() + str.substr(1)) : '';
}

function setLayoutClass(props, name, what, key) {
  if (props[name] !== undefined && props[key] !== undefined) {
    props.className = classNames('col-' + name + '-' + what + ' ',
                                props.className);
    delete props[key];
  }
}

function convertAndSetCamelCaseClass(props, key) {
  var klass = 'col-' + key.replace(/([A-Z])/mg, function(a) {  return '-' + a.toLowerCase() });
  props.className = classNames(klass, props.className);
  delete props[key];
}

export default class Col extends React.Component {
  render() {
    let props = {
      ...this.props,
    };

    for (var i = 0; i < breakpoints.length; i++) {
      for (var j = 0; j < directions.length; j++) {
        setLayoutClass(props,
                         breakpoints[i],
                         `collapse-${directions[j]}`,
                         `collapse${ucfirst(directions[j])}`)
        setLayoutClass(props,
                         breakpoints[i],
                         `gutter-${directions[j]}`,
                         `gutter${ucfirst(directions[j])}`)
      }

      if (props.hasOwnProperty(breakpoints[i]+'Visible')) {
        props.className = classNames('visible-' + breakpoints[i], props.className);
      }
    }

    if (props.hasOwnProperty('visible') && typeof props.visible === 'string') {
      var visibleBreakpoints = props.visible.split(',');
      for (var i = 0; i < visibleBreakpoints.length; i++) {
        var visibleBreakpoint = visibleBreakpoints[i].trim();
        props.className = classNames('visible-' + visibleBreakpoint, props.className);
      }
    }

    if (props.hasOwnProperty('hidden') && typeof props.hidden === 'string') {
      var hiddenBreakpoints = props.hidden.split(',');
      for (var i = 0; i < hiddenBreakpoints.length; i++) {
        var hiddenBreakpoint = hiddenBreakpoints[i].trim();
        props.className = classNames('hidden-' + hiddenBreakpoint, props.className);
      }
    }

    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        if (key.search('Collapse') !== -1
         || key.search('Gutter')   !== -1) {
          convertAndSetCamelCaseClass(props, key);
        }
      }
    }

    delete props.visible;

    return <BCol { ...props } />;
  }
}
