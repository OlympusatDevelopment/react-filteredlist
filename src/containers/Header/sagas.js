import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * header request/response handler
 */
export function* fetchHeader(args) {
    yield* sagaRequest(
        headersModel.getById,
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
export function* getHeader() {
    yield* sagaRequestSetup(fetchHeader, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getHeader
];
