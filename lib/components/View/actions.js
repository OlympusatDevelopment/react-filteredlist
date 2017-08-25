'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resetFilters = resetFilters;

var _constants = require('./constants');

function resetFilters(data) {
    return {
        type: _constants.RESET_FILTERS,
        data: data
    };
}