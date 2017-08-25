import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * customItem request/response handler
 */
export function* fetchCustomItem(args) {
    yield* sagaRequest(
        customItemsModel.getById,
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
export function* getCustomItem() {
    yield* sagaRequestSetup(fetchCustomItem, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getCustomItem
];
