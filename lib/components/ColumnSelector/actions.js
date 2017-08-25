'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateViewProps = updateViewProps;

var _constants = require('./constants');

/**
 * Load the repositories, this action starts the request saga
 */
function updateViewProps(data) {
  return {
    type: _constants.UPDATE_VIEW_PROPS,
    data: data
  };
}