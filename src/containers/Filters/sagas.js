import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * filters request/response handler
 */
export function* fetchFilters(args) {
    yield* sagaRequest(
        filterssModel.getById,
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
export function* getFilters() {
    yield* sagaRequestSetup(fetchFilters, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getFilters
];
