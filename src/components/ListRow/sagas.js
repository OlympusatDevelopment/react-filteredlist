import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * listRow request/response handler
 */
export function* fetchListRow(args) {
    yield* sagaRequest(
        listRowsModel.getById,
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
export function* getListRow() {
    yield* sagaRequestSetup(fetchListRow, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getListRow
];
