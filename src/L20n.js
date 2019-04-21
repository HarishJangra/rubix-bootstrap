import React from 'react';    import PropTypes from 'prop-types'
import Dispatcher from './Dispatcher';

import isBrowser from './isBrowser';

var win = null;
if (!isBrowser()) {
  win = {
    L20n: {
      getContext: function() {},
    },
  };
} else {
  win = window;

  if (!win.hasOwnProperty('L20n')) {
    win.L20n = {
      getContext: function() {},
    };
  }
}

var ctx = win.L20n.getContext();

var Entities = {
  ready: false,
  entities: {},
  registerEntity: function(entity) {
    if(Entities.hasOwnProperty(entity)) {
      if(!Entities.ready) return;
      Dispatcher.publish('ctx:'+entity);
      return;
    }
    ctx.localize([entity], function(l) {
      Dispatcher.publish('ctx:'+entity);
    });
    Entities[entity] = 1;
  }
};

var initializeLocales = function(locales, rpath) {
  rpath = rpath || '';
  ctx.ready(function() {
    Entities.ready = true;
    for(var i in Entities.entities) {
      Entities.registerEntity(Entities.entities[i]);
    }
    Dispatcher.publish('ctx:ready');
  });
  ctx.linkResource(function(locale) {
    return rpath + '/locales/' + locale + '/strings.l20n';
  });
  ctx.registerLocales(locales.default, locales.locales);
  ctx.requestLocales(locales.default);
};

var Entity = React.createClass({
  propTypes: {
    data: PropTypes.object,
    entity: PropTypes.string,
    dangerouslySetInnerHTML: PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      componentClass: 'span',
      componentAttribute: ''
    };
  },
  getInitialState: function() {
    return {
      entity: this.props.defaultValue || ''
    };
  },
  handler: function() {
    this.setState({
      entity: ctx.getSync(this.props.entity, this.props.data)
    });
  },
  componentDidMount: function() {
    this.subscription = Dispatcher.subscribe('ctx:'+this.props.entity, this.handler);
    Entities.registerEntity(this.props.entity);
    if(Entities.ready) {
      this.handler();
    }
  },
  componentWillUnmount: function() {
    Dispatcher.unsubscribe(this.subscription);
  },
  render: function() {
    var ComponentClass = this.props.componentClass;
    var componentAttribute = this.props.componentAttribute;

    var props = {
      ...this.props,
      data: null,
      entity: null,
      componentClass: null,
      componentAttribute: null,
    };

    delete props.entity;
    delete props.componentClass;
    delete props.componentAttribute;
    delete props.dangerouslySetInnerHTML;

    if(ComponentClass && componentAttribute.length) {
      props[componentAttribute] = this.state.entity;

      return (
        <ComponentClass {...props} />
      );
    }

    if(ComponentClass === 'input') {
      return (
        <ComponentClass {...props} value={this.state.entity} />
      );
    }
    if(this.props.dangerouslySetInnerHTML) {
      return (
        <ComponentClass {...props} dangerouslySetInnerHTML={{__html: this.state.entity}} />
      );
    }
    return (
      <ComponentClass {...props}>{this.state.entity}</ComponentClass>
    );
  }
});

module.exports = {
  ctx: ctx,
  initializeLocales: function(locales, rpath) {
    initializeLocales(locales, rpath);
  },
  ready: function() {
    if(Entities.ready) {
      Dispatcher.publish('ctx:ready');
      return;
    }
  },
  changeLocale: function(locale) {
    ctx.requestLocales(locale);
  },
  Entity: Entity
};
