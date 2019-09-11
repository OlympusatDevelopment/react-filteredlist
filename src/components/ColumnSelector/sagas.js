import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * columnSelector request/response handler
 */
export function* fetchColumnSelector(args) {
    yield* sagaRequest(
        columnSelectorsModel.getById,
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
export function* getColumnSelector() {
    yield* sagaRequestSetup(fetchColumnSelector, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getColumnSelector
];
