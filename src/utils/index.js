import fltrs from './filters';
import cllctns from './collections';
import qrs from './queries';

const utils = {
    convertUNIXToHumanDate(UNIX_timestamp){
        if (UNIX_timestamp == undefined) { return '';}
        if (UNIX_timestamp.toString().length < 12) { UNIX_timestamp = UNIX_timestamp * 1000;}//Convert seconds to ms

        const a       = new Date(+UNIX_timestamp),
              options = {
                  weekday: "short", year: "numeric", month: "short",
                  day : "numeric", hour: "2-digit", minute: "2-digit"
              };

        return a.toLocaleTimeString("en-us", options);//@todo, can we set language using our app's language here?
    },

    propToTitleCase : (camelCase) => camelCase
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
};

//export function* sagaRequest(fn, fnParams, CON_SUCCESS, CON_FAIL, {take,call,put,select,cancel,takeLatest}) {
//    try {
//        let res = yield fn(fnParams);
//        l('SAGA', res);
//
//        // Catch the error and notify the user
//        if(res.hasOwnProperty('Error')){
//            utils.notify({message: `Server error: ${JSON.stringify(res.Error)}`, level: 'error', position: 'br'});
//            res = null;
//        }
//
//        yield put({type: CON_SUCCESS, data: res});
//    } catch (err) {
//        l('SAGA ERR', err);
//        utils.notify({message: JSON.stringify(err), level: 'error', position: 'br'});
//
//        yield put({type: CON_FAIL, err});
//    }
//}
//
//export function* sagaRequestSetup(fn, CON, {take,call,put,select,cancel,takeLatest}) {
//    const watcher = yield takeLatest(CON, fn);
//
//    // Suspend execution until location changes
//    yield cancel(watcher);
//}

export const filters = fltrs;
export const collections = cllctns;
export const queries = qrs;
export let l = window.location.hostname === 'localhost' ? console.log : ()=> {};
export const makeHumanDate = utils.convertUNIXToHumanDate;
export default utils;