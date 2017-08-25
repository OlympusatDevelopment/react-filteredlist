import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * dataList request/response handler
 */
export function* fetchDataList(args) {
    yield* sagaRequest(
        dataListsModel.getById,
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
export function* getDataList() {
    yield* sagaRequestSetup(fetchDataList, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getDataList
];
