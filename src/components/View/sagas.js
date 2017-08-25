import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * view request/response handler
 */
export function* fetchView(args) {
    yield* sagaRequest(
        viewsModel.getById,
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
export function* getView() {
    yield* sagaRequestSetup(fetchView, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getView
];
