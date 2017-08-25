import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

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
export default [
    // getFilterItem
];
