'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateWorkspace = updateWorkspace;

var _constants = require('./constants');

function updateWorkspace(data) {
    return {
        type: _constants.UPDATE_WORKSPACE,
        data: data
    };
}