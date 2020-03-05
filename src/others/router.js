import React from "react";
import PropTypes from "prop-types";
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

import onRouterSetup from "../node/onRouterSetup";
import checkScroll from "../node/checkScroll";

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
  routes;

function getPreloadedDataElement() {
  return document.getElementById("preloadedData");
}

function getData() {
  let data = '""';
  if (isBrowser()) {
    const preloadedData = getPreloadedDataElement();
    data = preloadedData ? JSON.parse(preloadedData.textContent) : '""';
  }
  return data;
}

function clearData() {
  if (isBrowser()) {
    const preloadedData = getPreloadedDataElement();
    if (preloadedData) {
      preloadedData.textContent = '""';
    }
  }
}

class FetchData extends React.Component {
  constructor(...args) {
    super(...args);

    let props = args[0];

    this.originalData = props.data || getData() || '""';

    this.state = {
      data: props.data || getData() || '""'
    };
  }

  fetchData(props) {
    if (isBrowser()) {
      let { component } = props;
      if (component.fetchData) {
        component.fetchData(props).then(result => {
          this.setState({
            data: result.data,
            errors: result.errors
          });
        });
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }

  componentDidMount() {
    if (isBrowser()) {
      // clear server data once rendered
      clearData();

      let { component } = this.props;
      if (component.fetchDataOnPageLoad) {
        this.fetchData(this.props);
      }
    }
  }

  render() {
    let { component, routerProps } = this.props;
    let Component = component;
    return <Component {...routerProps} data={this.state.data} />;
  }
}

function onCreateElement(Component, routerProps) {
  return <FetchData component={Component} routerProps={routerProps} />;
}

export default function render(Component, onRender) {
  if (!onRender) onRender = function() {};

  if (isBrowser()) {
    // in browser

    if (!isRouterSet) {
      isRouterSet = true;
      history = Modernizr.history ? browserHistory : hashHistory;
      routes = (
        <Router
          history={history}
          createElement={onCreateElement}
          render={applyRouterMiddleware(useScroll(checkScroll))}
        >
          {Component}
        </Router>
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

class StaticComponentInternal extends React.Component {
  render() {
    let Handler = null,
      props = this.props,
      data = props.data || '""';

    let location =
      this.props.path + (this.props.query ? "?" + this.props.query : "");

    match(
      { routes, location: location },
      (error, redirectLocation, renderProps) => {
        Handler = (
          <AppContainer>
            <RouterContext
              {...renderProps}
              createElement={(Component, routerProps) => {
                return (
                  <FetchData
                    component={Component}
                    routerProps={routerProps}
                    data={data}
                  />
                );
              }}
            />
          </AppContainer>
        );
      }
    );

    return Handler;
  }
}

export function setRoutes(_routes) {
  routes = _routes;
}

export function getCsrfToken() {
  if (!isBrowser()) return "";
  let el =
    document.getElementById("csrfToken") ||
    document.querySelectorAll("[name=csrf-token]")[0];

  if (el) {
    if (el.textContent.length) {
      return el.textContent.trim();
    } else {
      return el.getAttribute("content");
    }
  }
}

if (!isBrowser()) {
  global.StaticComponent = StaticComponentInternal;
}
