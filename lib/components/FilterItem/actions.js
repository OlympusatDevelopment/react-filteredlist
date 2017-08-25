'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterChange = filterChange;

var _constants = require('./constants');

function filterChange(data) {
  return {
    type: _constants.FILTER_CHANGE,
    data: data
  };
}