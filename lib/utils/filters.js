'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Executing switch that also routes how to make the request
 * @param _state
 * @param options
 */
function runFilters(_state, options) {
    return new _bluebird2.default(function (resolve, reject) {
        return _queries2.default.makeXHRRequest(_state, options).then(function (res) {
            return _render(res, options, _state);
        }).catch(reject);

        // switch(options.api.type){
        //     // case 'graphql' :
        //     //     queries.makeGraphQLRequest(_state,options)
        //     //         .then(res=>_render(res,options,_state))
        //     //         .catch(reject);
        //     //     break;
        //     case 'rest' :
        //     default:
        //         return queries.makeXHRRequest(_state,options)
        //             .then(res=>_render(res,options,_state))
        //             .catch(reject);
        // }
    });
}

/**
 * Render with the method set by the main config options object
 * @param items
 * @param options
 * @returns {Promise}
 */
function _render(xhrResponse, options, _state) {
    return new _bluebird2.default(function (resolve, reject) {
        switch (options.renderTo) {
            case 'store':
            default:

                // EMit an event containing the data to be added to the store
                // EVent is picked up in the App/index.js component constructor
                var elem = document,
                    event = elem.createEvent('Event');
                event.initEvent('renderToStore', true, true); //can bubble, and is cancellable
                event.data = xhrResponse;
                document.dispatchEvent(event);

                break;
        }
    });
}

exports.default = {
    run: runFilters
};