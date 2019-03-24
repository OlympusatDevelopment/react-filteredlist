import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * displayItem request/response handler
 */
export function* fetchDisplayItem(args) {
    yield* sagaRequest(
        displayItemsModel.getById,
        {entityUUID: args.data.entityUUID},
        GET_APP_SUCCEEDED,
        GET_APP_FAILED,
        {...effects},
        false
    );
}

/**
 * Root saga manages watcher lifecycle
 */
export function* getDisplayItem() {
    yield* sagaRequestSetup(fetchDisplayItem, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getDisplayItem
];
