'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCurrentTab = updateCurrentTab;

var _constants = require('./constants');

/**
 * Load the repositories, this action starts the request saga
 */
function updateCurrentTab(data) {
  return {
    type: _constants.UPDATE_CURRENT_TAB,
    data: data
  };
}