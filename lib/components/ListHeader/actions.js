'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateWorkspace = updateWorkspace;
exports.filterChange = filterChange;

var _constants = require('./constants');

function updateWorkspace(data) {
    return {
        type: _constants.UPDATE_WORKSPACE,
        data: data
    };
}

function filterChange(data) {
    return {
        type: _constants.FILTER_CHANGE,
        data: data
    };
}