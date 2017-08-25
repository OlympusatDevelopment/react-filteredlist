import * as effects from 'redux-saga/effects';
import {} from './constants';
import utils,{l,sagaRequest,sagaRequestSetup} from '../../utils';

/**
 * textItem request/response handler
 */
export function* fetchTextItem(args) {
    yield* sagaRequest(
        textItemsModel.getById,
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
export function* getTextItem() {
    yield* sagaRequestSetup(fetchTextItem, GET_APP, {...effects})
}

// Bootstrap sagas
export default [
    getTextItem
];
