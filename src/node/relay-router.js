import React from 'react';    import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { Router, match, RouterContext, applyRouterMiddleware,
         hashHistory, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';

import Relay from 'react-relay';
import IsomorphicRelay from 'isomorphic-relay';
import IsomorphicRouter from '@sketchpixy/isomorphic-relay-router';
import useScroll from '@sketchpixy/react-router-scroll';

import onRouterSetup from './onRouterSetup';
import checkScroll from './checkScroll';

import isBrowser from '../isBrowser';

if (isBrowser()) {
  onRouterSetup();
}

var GRAPHQL_URL = `http://localhost:8080/graphql`, CLIENT_GRAPHQL_URL=`/graphql`, networkLayer;

export function setNetworkLayer(endpoint) {
  if (isBrowser()) {
    CLIENT_GRAPHQL_URL = endpoint;
  } else {
    GRAPHQL_URL = endpoint || GRAPHQL_URL;

    networkLayer = !isBrowser() ?
                           new Relay.DefaultNetworkLayer(GRAPHQL_URL)
                         : null;
  }
}

class WrapperComponent extends React.Component {
  render() {
    return this.props.children;
  }
}

export default function render(Component, onRender) {
  if (!onRender) onRender = function() {};

  if (isBrowser()) {
    // in browser
    const history = (Modernizr.history
                      ? browserHistory
                      : hashHistory);

    const environment = new Relay.Environment();
    environment.injectNetworkLayer(new Relay.DefaultNetworkLayer(CLIENT_GRAPHQL_URL));

    const preloadedData = document.getElementById('preloadedData');
    const data = preloadedData ? JSON.parse(preloadedData.textContent) : '';
    IsomorphicRelay.injectPreparedData(environment, data);

    match({ routes: Component, history: history }, (error, redirectLocation, renderProps) => {
      IsomorphicRouter.prepareInitialRender(environment, renderProps).then(props => {
        ReactDOM.render(<AppContainer><Router {...props} /></AppContainer>, document.getElementById('app-container'), onRender);
      });
    });
  }
}


function renderIRData({ data, props }) {
  return {
    content: ReactDOMServer.renderToString(
                <AppContainer>{IsomorphicRouter.render(props)}</AppContainer>
             ),
    data: data
  };
}

export function renderHTMLString(routes, req, callback) {
  // in server
  match({ routes, location: req.url}, (error, redirectLocation, renderProps) => {
    if (error) {
      callback(error);
    } else if (redirectLocation) {
      callback(null, redirectLocation);
    } else if (renderProps) {
      IsomorphicRouter.prepareData(renderProps, networkLayer)
                      .then(renderIRData)
                      .then((data) => {
                        callback(null, null, data);
                      });
    } else {
      callback({
        message: 'Not found'
      });
    }
  });
}
