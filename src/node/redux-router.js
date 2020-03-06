import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import {
  Router,
  match,
  RouterContext,
  applyRouterMiddleware,
  hashHistory,
  browserHistory
} from "react-router";
import { AppContainer } from "react-hot-loader";
import useScroll from "react-router-scroll";

import { Provider } from "react-redux";
import {
  createStore,
  combineReducers,
  applyMiddleware as origApplyMiddleware,
  compose
} from "redux";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import thunk from "redux-thunk";

import {
  FetchData,
  fetchDataOnServer,
  reducer as fetching
} from "@harishjangra/redux-fetch-data";
import { flattenComponents } from "@harishjangra/redux-fetch-data/lib/utils";

import onRouterSetup from "./onRouterSetup";
import onRouterUpdate from "./onRouterUpdate";
import checkScroll from "./checkScroll";

import isBrowser from "../isBrowser";

if (isBrowser()) {
  onRouterSetup();
}

class WrapperComponent extends React.Component {
  render() {
    return this.props.children;
  }
}

var isRouterSet = false,
  history,
  reducer,
  store,
  routes;

export function setupReducers(reducers) {
  reducer = combineReducers({
    ...reducers,
    fetching: fetching,
    routing: routerReducer
  });
}

export function replaceReducers(reducers) {
  setupReducers(reducers);
  store.replaceReducer(reducer);
}

function preloadedData() {
  return document.getElementById("preloadedData");
}

function getData() {
  let element = preloadedData();
  return element ? JSON.parse(element.textContent) : "";
}

var middlewares = [thunk];
export function applyMiddleware(...args) {
  if (args.length) {
    middlewares = middlewares.concat(args);
  }
}

function createStoreWithMiddleware() {
  return compose(
    origApplyMiddleware(...middlewares),
    isBrowser() && typeof window.devToolsExtension !== "undefined"
      ? window.devToolsExtension()
      : f => f
  )(createStore);
}

export function createReduxStore(initialState) {
  return createStoreWithMiddleware()(reducer, initialState);
}

function onFetchData(props) {
  // onRouterUpdate();
  var container = document.getElementById("container");
  if (container) {
    container.scrollTop = 0;
  }
  return <FetchData {...props} />;
}

export default function render(Component, onRender) {
  if (!onRender) onRender = function() {};

  if (isBrowser()) {
    // in browser

    if (!isRouterSet) {
      isRouterSet = true;
      history = Modernizr.history ? browserHistory : hashHistory;

      const initialState = getData();
      store = createReduxStore(initialState);
      history = syncHistoryWithStore(history, store);

      routes = (
        <Provider store={store} key="provider">
          <Router history={history} render={onFetchData}>
            {Component}
          </Router>
        </Provider>
      );
    }

    ReactDOM.render(
      <AppContainer>
        <WrapperComponent>{routes}</WrapperComponent>
      </AppContainer>,
      document.getElementById("app-container"),
      onRender
    );
  }
}

export function renderHTMLString(routes, req, callback) {
  const store = createReduxStore();

  // in server
  match(
    { routes, location: req.url },
    (error, redirectLocation, renderProps) => {
      if (!renderProps) {
        callback("renderProps not defined!");
        return;
      }

      fetchDataOnServer(renderProps, store).then(() => {
        if (error) {
          callback(error);
        } else if (redirectLocation) {
          callback(null, redirectLocation);
        } else if (renderProps) {
          callback(null, null, {
            content: ReactDOMServer.renderToString(
              <AppContainer>
                <Provider store={store} key="provider">
                  <RouterContext {...renderProps} />
                </Provider>
              </AppContainer>
            ),
            data: store.getState()
          });
        } else {
          callback({
            message: "Not found"
          });
        }
      });
    }
  );
}
