import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * search request/response handler
 */
export function* fetchSearch(args) {
    yield* sagaRequest(
        searchsModel.getById,
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
export function* getSearch() {
    yield* sagaRequestSetup(fetchSearch, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getSearch
];
