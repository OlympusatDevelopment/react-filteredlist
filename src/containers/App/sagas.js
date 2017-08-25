import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * app request/response handler
 */
export function* fetchApp(args) {
    yield* sagaRequest(
        appsModel.getById,
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
export function* getApp() {
    yield* sagaRequestSetup(fetchApp, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getApp
];
