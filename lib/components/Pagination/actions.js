'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updatePagination = updatePagination;

var _constants = require('./constants');

function updatePagination(data) {
    return {
        type: _constants.UPDATE_PAGINATION,
        data: data
    };
}