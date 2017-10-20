'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.fetchDisplayItem = fetchDisplayItem;
exports.getDisplayItem = getDisplayItem;

var _effects = require('redux-saga/effects');

var effects = _interopRequireWildcard(_effects);

require('./constants');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(fetchDisplayItem),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(getDisplayItem);

/**
 * displayItem request/response handler
 */
function fetchDisplayItem(args) {
    return regeneratorRuntime.wrap(function fetchDisplayItem$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    return _context.delegateYield((0, _utils.sagaRequest)(displayItemsModel.getById, { entityUUID: args.data.entityUUID }, GET_APP_SUCCEEDED, GET_APP_FAILED, _extends({}, effects), false), 't0', 1);

                case 1:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}

/**
 * Root saga manages watcher lifecycle
 */
function getDisplayItem() {
    return regeneratorRuntime.wrap(function getDisplayItem$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    return _context2.delegateYield((0, _utils.sagaRequestSetup)(fetchDisplayItem, GET_APP, _extends({}, effects)), 't0', 1);

                case 1:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _marked2, this);
}

// Bootstrap sagas
exports.default = [getDisplayItem];