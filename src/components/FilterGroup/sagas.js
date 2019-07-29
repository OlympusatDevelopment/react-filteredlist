import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * filterGroup request/response handler
 */
export function* fetchFilterGroup(args) {
    yield* sagaRequest(
        filterGroupsModel.getById,
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
export function* getFilterGroup() {
    yield* sagaRequestSetup(fetchFilterGroup, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getFilterGroup
];
