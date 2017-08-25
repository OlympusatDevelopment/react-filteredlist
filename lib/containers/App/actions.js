'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateItems = updateItems;
exports.appInit = appInit;
exports.updatePagination = updatePagination;
exports.filterChange = filterChange;

var _constants = require('./constants');

function updateItems(data) {
    return {
        type: _constants.UPDATE_ITEMS,
        data: data
    };
}

function appInit(data) {
    return {
        type: _constants.ON_APP_INIT,
        data: data
    };
}

function updatePagination(data) {
    return {
        type: _constants.UPDATE_PAGINATION,
        data: data
    };
}

function filterChange(data) {
    return {
        type: _constants.FILTER_CHANGE,
        data: data
    };
}