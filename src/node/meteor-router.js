import { ReactRouterSSR } from 'meteor/rubix:reactrouter:react-router-ssr';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { FetchData, fetchDataOnServer, reducer as fetching } from '@sketchpixy/redux-fetch-data';

import onRouterSetup from './onRouterSetup';
import onRouterUpdate from './onRouterUpdate';
import checkScroll from './checkScroll';

import isBrowser from '../isBrowser';

if (isBrowser()) {
  onRouterSetup();
}

let reducer;

export function setupReducers(reducers) {
  reducer = combineReducers({
    ...reducers,
    fetching: fetching,
    routing: routerReducer,
  });
}

function getData() {
  if (Meteor.isClient) return Inject.getObj('preloadedData');
  return "";
}

function setData(data) {
  if (Meteor.isServer) Inject.obj('preloadedData', data);
}

function createStoreWithMiddleware() {
  return compose(
    applyMiddleware(thunk),
    isBrowser() && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore);
}

export function createReduxStore(initialState) {
  return (createStoreWithMiddleware())(reducer, initialState);
}

function onFetchData(props) {
  onRouterUpdate();
  var container = document.getElementById('container');
  if (container) {
    container.scrollTop = 0;
  }
  return <FetchData {...props} />;
}

export default function render(routes) {
  const initialState = getData();
  let store;

  if (isBrowser()) {
    store = createReduxStore(initialState);
  } else {
    store = createReduxStore();
  }

  ReactRouterSSR.Run(routes, {
    rootElement: 'app-container',
    props: {
      render: onFetchData
    },
    wrapperHook: (app) => {
      return (
        <Provider store={store} key='provider'>
          {app}
        </Provider>
      );
    }
  }, {
    preWrapperHook: (renderProps, callback) => {
      // pre-fill store with data
      fetchDataOnServer(renderProps, store).then(() => {
        // store is filled
        setData(store.getState());

        // callback to proceed with rendering
        callback();
      });
    }
  });
}
