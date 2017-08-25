'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Combine all reducers in this file and export the combined reducers.
                                                                                                                                                                                                                                                                   * If we were to do this in store.js, reducers wouldn't be hot reloadable.
                                                                                                                                                                                                                                                                   */


exports.default = createReducer;

var _redux = require('redux');

var _reducer = require('./containers/App/reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _reducer3 = require('./containers/LanguageProvider/reducer');

var _reducer4 = _interopRequireDefault(_reducer3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
function createReducer(asyncReducers) {
  return (0, _redux.combineReducers)(_extends({
    language: _reducer4.default,
    app: _reducer2.default
  }, asyncReducers));
}