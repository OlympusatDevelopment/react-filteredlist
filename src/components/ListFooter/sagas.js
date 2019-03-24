import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * listFooter request/response handler
 */
export function* fetchListFooter(args) {
    yield* sagaRequest(
        listFootersModel.getById,
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
export function* getListFooter() {
    yield* sagaRequestSetup(fetchListFooter, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getListFooter
];
