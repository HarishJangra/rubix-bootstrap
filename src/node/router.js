import React from 'react';    import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, match, RouterContext, applyRouterMiddleware,
         hashHistory, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';
import useScroll from '@sketchpixy/react-router-scroll';

import onRouterSetup from './onRouterSetup';
import checkScroll from './checkScroll';

import isBrowser from '../isBrowser';

if (isBrowser()) {
  onRouterSetup();
}

class WrapperComponent extends React.Component {
  render() {
    return this.props.children;
  }
}

var isRouterSet = false, history, routes;

export default function render(Component, onRender) {
  if (!onRender) onRender = function() {};

  if (isBrowser()) {
    // in browser

    if (!isRouterSet) {
      isRouterSet = true;
      history = (Modernizr.history
                        ? browserHistory
                        : hashHistory);
      routes = (
        <Router history={history}
                render={applyRouterMiddleware(useScroll(checkScroll))}>
          {Component}
        </Router>
      );
    }

    ReactDOM.render(<AppContainer><WrapperComponent>{routes}</WrapperComponent></AppContainer>,
      document.getElementById('app-container'),
      onRender);
  }
}

export function renderHTMLString(routes, req, callback) {
  // in server
  match({ routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      callback(error);
    } else if (redirectLocation) {
      callback(null, redirectLocation);
    } else if (renderProps) {
      callback(null, null, ReactDOMServer.renderToString(
        <AppContainer><RouterContext {...renderProps} /></AppContainer>
      ));
    } else {
      callback({
        message: 'Not found'
      });
    }
  });
}
