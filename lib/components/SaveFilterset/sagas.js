'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _effects = require('redux-saga/effects');

var effects = _interopRequireWildcard(_effects);

require('./constants');

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * filterItem request/response handler
 */
// export function* fetchFilterItem(args) {
//     yield* sagaRequest(
//         filterItemsModel.getById,
//         {entityUUID: args.data.entityUUID},
//         GET_APP_SUCCEEDED,
//         GET_APP_FAILED,
//         {...effects},
//         false
//     );
// }

// /**
//  * Root saga manages watcher lifecycle
//  */
// export function* getFilterItem() {
//     yield* sagaRequestSetup(fetchFilterItem, GET_APP, {...effects})
// }

// Bootstrap sagas
exports.default = [
  // getFilterItem
];