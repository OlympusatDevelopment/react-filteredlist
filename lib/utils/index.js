'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.makeHumanDate = exports.l = exports.queries = exports.collections = exports.filters = undefined;

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

var _collections = require('./collections');

var _collections2 = _interopRequireDefault(_collections);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {
    convertUNIXToHumanDate: function convertUNIXToHumanDate(UNIX_timestamp) {
        if (UNIX_timestamp == undefined) {
            return '';
        }
        if (UNIX_timestamp.toString().length < 12) {
            UNIX_timestamp = UNIX_timestamp * 1000;
        } //Convert seconds to ms

        var a = new Date(+UNIX_timestamp),
            options = {
            weekday: "short", year: "numeric", month: "short",
            day: "numeric", hour: "2-digit", minute: "2-digit"
        };

        return a.toLocaleTimeString("en-us", options); //@todo, can we set language using our app's language here?
    },


    propToTitleCase: function propToTitleCase(camelCase) {
        return camelCase.replace(/([A-Z])/g, function (match) {
            return ' ' + match;
        }).replace(/^./, function (match) {
            return match.toUpperCase();
        });
    }
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

var filters = exports.filters = _filters2.default;
var collections = exports.collections = _collections2.default;
var queries = exports.queries = _queries2.default;
var l = exports.l = window.location.hostname === 'localhost' ? console.log : function () {};
var makeHumanDate = exports.makeHumanDate = utils.convertUNIXToHumanDate;
exports.default = utils;