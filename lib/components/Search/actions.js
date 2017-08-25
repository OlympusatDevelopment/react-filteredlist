'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.filterChange = filterChange;
exports.updateSearch = updateSearch;

var _constants = require('./constants');

function filterChange(data) {
    return {
        type: _constants.FILTER_CHANGE,
        data: data
    };
}

function updateSearch(data) {
    return {
        type: _constants.UPDATE_SEARCH_INPUT,
        data: data
    };
}