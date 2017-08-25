import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * listHeader request/response handler
 */
export function* fetchListHeader(args) {
    yield* sagaRequest(
        listHeadersModel.getById,
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
export function* getListHeader() {
    yield* sagaRequestSetup(fetchListHeader, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getListHeader
];
