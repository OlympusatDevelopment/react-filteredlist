import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * footer request/response handler
 */
export function* fetchFooter(args) {
    yield* sagaRequest(
        footersModel.getById,
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
export function* getFooter() {
    yield* sagaRequestSetup(fetchFooter, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getFooter
];
