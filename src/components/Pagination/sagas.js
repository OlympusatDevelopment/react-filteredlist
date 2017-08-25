import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * pagination request/response handler
 */
export function* fetchPagination(args) {
    yield* sagaRequest(
        paginationsModel.getById,
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
export function* getPagination() {
    yield* sagaRequestSetup(fetchPagination, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getPagination
];
