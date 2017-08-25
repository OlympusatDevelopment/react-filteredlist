'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Create the store with asynchronously loaded reducers
                                                                                                                                                                                                                                                                               */

exports.default = configureStore;

var _redux = require('redux');

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var history = arguments[1];

  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  var middlewares = [
    //redix thunk or redux saga would go here
  ];

  var enhancers = [_redux.applyMiddleware.apply(undefined, middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  var composeEnhancers = process.env.NODE_ENV !== 'production' && (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : _redux.compose;
  /* eslint-enable */

  var store = (0, _redux.createStore)((0, _reducers2.default)(), initialState, composeEnhancers.apply(undefined, enhancers));

  // Extensions
  //store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  //if (module.hot) {
  //  module.hot.accept('./reducers', () => {
  //    import('./reducers').then((reducerModule) => {
  //      const createReducers = reducerModule.default;
  //      const nextReducers = createReducers(store.asyncReducers);
  //
  //      store.replaceReducer(nextReducers);
  //    });
  //  });
  //}

  return store;
}