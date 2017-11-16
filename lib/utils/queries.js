'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _xhr = require('xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
//import moment from 'moment';


var history = (0, _createBrowserHistory2.default)();
/**
 * Returns the query parameter based on state.filters
 * @param queryObject
 */
function makeQueryString(queryObject) {

    // Remove anything with a null value
    // Handles single values and range values
    Object.keys(queryObject).forEach(function (key) {
        return (queryObject[key] == null || queryObject[key].hasOwnProperty('start') && queryObject[key].hasOwnProperty('end') && queryObject[key].start == null && queryObject[key].end == null) && delete queryObject[key];
    });

    var queryString = _underscore2.default.map(queryObject, function (v, k) {
        var attribute = k,
            value = v,
            tmp_query = '';

        // Handle array values by using key name as attribute and each value separately
        // if (_.isArray(value)) {
        //     value.forEach(val=> {
        //         tmp_query = `${tmp_query}&${attribute}=${val}`;
        //     });
        // } else 
        if (value.hasOwnProperty('start') && value.hasOwnProperty('end')) {
            tmp_query = attribute + '--start=' + value.start + '&' + attribute + '--end=' + value.end;
        } else {
            tmp_query = attribute + '=' + value;
        }

        return tmp_query;
    }).reduce(function (sum, query) {

        //Handle missing &
        if (query.charAt(0) !== '&') {
            query = '&' + query;
        }

        // Combine query strings
        return sum + query;
    }, '');

    // Handle the ? character at the beginning of the string
    if (queryString.charAt(0) === '&') {
        queryString = queryString.replace(/^&/, '?');
    } else if (queryString.charAt(0) !== '&' || queryString.charAt(0) !== '?') {
        queryString = '?' + queryString;
    }

    return queryString;
}

/**
 * Makes the query object to be translated according to output type specification
 * @param filters
 * @returns {*}
 * @private
 */
function makeQueryObject(filters) {
    return filters.map(function (filter) {
        return _defineProperty({}, filter.id, filter.range ? filter.range : filter.value);
    }).reduce(function (sum, query) {
        var key = _underscore2.default.keys(query)[0];

        // Check if the property to filter on exists already;
        // Then check if it's an array.
        // make it an array and push the value
        if (sum.hasOwnProperty(key) && !(key.indexOf('sort-') > -1)) {
            if (_underscore2.default.isArray(sum[key])) {
                sum[key].push(query[key]); // Add the new value
            } else {
                sum[key] = [sum[key]]; // Extract the string value and transform to an array
                sum[key].push(query[key]); //Add the new value
            }
        } else {
            sum[key] = query[key]; // First run, add the string
        }
        // return the mutated object
        return sum;
    }, {});
}

/**
 * Writes the query string to the url
 * @param queryString
 * @param options
 * @private
 */
function writeQueryStringToURL(queryString, options) {
    // @todo add url_encode and base^4 encode and decode to the write system
    // Only allow if the config file specifies
    if (options.writeQueryStringToURL && (queryString || queryString === null)) {
        var path = window.location.href.split('?')[0].split(window.location.host)[1];

        if (queryString === null) {
            queryString = '';
        }

        var replaceURL = (path + queryString + '&' + getPaginationQueryParams()).replace(/&+$/, "");

        if (options.clearPaginationQueryString) {
            replaceURL = path + queryString;
        }

        // The delay is import for handling what looks like a conflict with Meteor's iron-router
        //@todo may be able to remove this from filterSort component not in a Meteor site
        //setTimeout(function(){
        history.replace(replaceURL);
        //},1000);
    }
}

/**
 * Removes everything from the url
 */
function clearURLQueryString() {
    var path = window.location.href.split('?')[0].split(window.location.host)[1];

    history.replace(path.replace(/&+$/, ""));
}

/**
 * Gets the pagination query params from the url to preserve them on write
 */
function getPaginationQueryParams() {
    var params = _underscore2.default.pick(parseParms(readQueryStringFromURL()), ['skip', 'take', 'page']);
    var str = '';

    for (var key in params) {
        str += key + '=' + params[key] + '&';
    }

    return str.slice(0, -1); // removes the last ampersand
    //return params;
}

/**
 * Fetches the current view from the url
 * @returns {string}
 */
function getViewParamFromURL() {
    var params = _underscore2.default.pick(parseParms(readQueryStringFromURL()), ['view']);
    var str = '';

    for (var key in params) {
        str += key + '=' + params[key] + '&';
    }

    return parseParms(str.slice(0, -1)).view;
}

/**
 * From: http://stackoverflow.com/questions/23481979/function-to-convert-url-hash-parameters-into-object-key-value-pairs
 * @param str
 * @returns {{}}
 */
function parseParms() {
    var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    var pieces = str.split("&"),
        data = {},
        i,
        parts;
    // process each query pair
    for (i = 0; i < pieces.length; i++) {
        parts = pieces[i].split("=");
        if (parts.length < 2) {
            parts.push("");
        }
        data[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    }
    return data;
}

/**
 * Reads the query string from a url
 */
function readQueryStringFromURL() {
    return window.location.href.split('?')[1] || '';

    //return history.location.search;
}

/**
 * Converts a query string to a query object. Used on app load to rebuild a filter set
 * @param str
 */
function makeQueryObjectFromQueryString(str) {
    var queryString = decodeURI(str).split("&"),
        queryParams = {},
        segment = void 0,
        value = void 0,
        key = void 0;

    for (var i = 0; i < queryString.length; i++) {
        segment = queryString[i].split('=');
        key = segment[0];
        value = segment[1] && segment[1].charAt(0) === '[' ? decodeURIComponent(segment[1]) : segment[1];
        // Handle sort params nested object
        if (key && key.indexOf('sort-') > -1) {
            if (!queryParams.hasOwnProperty('sort')) {
                queryParams.sort = {};
            }

            queryParams.sort[key.split('sort-')[1]] = value;
        } else {
            //Filter params
            if (key && queryParams.hasOwnProperty(key)) {
                if (_underscore2.default.isArray(queryParams[key])) {
                    queryParams[key].push([value]); // Add the new value
                } else {
                    queryParams[key] = [queryParams[key]]; // Extract the string value and transform to an array
                    queryParams[key].push([value]); //Add the new value
                }
            } else {
                if (key) {
                    queryParams[key] = value.split(","); // First run, add the string
                }
            }
        }
    }
    return queryParams;
}

/**
 * Makes a graphql request to the enpoint provided
 * @param data
 * @param options
 */
function makeGraphQLRequest(data, options) {
    return new _bluebird2.default(function (resolve, reject) {
        var token = options.api.token;
        var opts = {
            method: options.api.method,
            uri: options.api.url,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (token) {
            opts.headers['Authorization'] = token;
        }

        // Add the body if this is a post request
        //@todo add graphQLQueryObject to the store
        if (options.api.method.toLowerCase() === 'post') {
            //opts.body = new Buffer(JSON.stringify(data.graphQLQueryObject)).toString('base64');
            opts.body = new Buffer(JSON.stringify("")).toString('base64');
        }

        (0, _xhr2.default)(opts, function (err, res, body) {
            if (err) {
                resolve(err, options);
            }

            resolve(JSON.parse(body));
        });
    });
}

/**
 * Makes an xhr request to the endpoint provided, using hooks or a proxy coming from the options object
 * @param _state
 * @param options
 */
function makeXHRRequest(_state, options) {
    return new _bluebird2.default(function (resolve, reject) {
        var skip = _state.pagination.hasOwnProperty('skip') ? _state.pagination.skip * 1 : 0,
            take = _state.pagination.hasOwnProperty('take') ? _state.pagination.take * 1 : 25;

        var opts = {
            method: options.api.method,
            // uri: `${options.api.url}?skip=${skip}&take=${take}`,
            uri: '' + options.api.url,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        delete _state.queryObject.view; // View is for internal use only        

        // Are we using a proxy function to make our xhr call?
        if (options.api.xhrProxy) {
            makeCall(options.api.xhrProxy);
        } else {
            // Decide if we need to make a tokened request or not
            if (options.api.token) {
                opts.headers['authorization'] = options.api.token;

                // Handle token refresh in a hook
                if (options.api.onTokenNeedsRefresh && window.AWS.config.credentials.needsRefresh()) {
                    options.api.onTokenNeedsRefresh(makeCall);
                } else {
                    makeCall();
                }
            } else {
                makeCall();
            }
        }

        // Implicitly pass data into scope
        function makeCall(proxy) {
            var caller = proxy || _xhr2.default;

            // Before request hook
            var requestData = { data: _state, xhrOptions: opts };

            // Add the body if this is a post request
            if (options.api.method.toLowerCase() === 'post') {
                switch (options.api.type) {
                    case 'graphql':

                        // Reason : If using a proxy, let the proxy decide how to send the payload.
                        requestData.xhrOptions.body = options.api.xhrProxy ? requestData.data.queryObject : JSON.stringify(requestData.data.queryObject);

                        if (proxy) {
                            requestData.xhrOptions.pagination = { skip: skip, take: take };
                        }
                        break;
                    case 'rest':
                    default:
                        requestData.xhrOptions.uri = requestData.xhrOptions.uri + '?skip=' + skip + '&take=' + take;
                        requestData.xhrOptions.body = new Buffer(JSON.stringify(requestData.data.queryObject)).toString('base64');
                        break;
                }
            }

            // Before request hook
            var hookedData = _state.config.hooks.beforeXHR ? _state.config.hooks.beforeXHR(_state, opts, requestData) : requestData;

            //console.log('XHR RESPONSE',result,requestData.xhrOptions);

            // Finally : Make our xhr call using either the xhr lib or our proxy
            caller(hookedData.xhrOptions, function (err, res, body) {
                if (err) {
                    reject(_state.config.hooks.onXHRFail ? _state.config.hooks.onXHRFail(err, body) : body);
                    return false;
                }

                var result = body;
                try {
                    result = JSON.parse(body);
                } catch (e) {}

                //console.log('XHR RESPONSE',result,hookedData.xhrOptions);
                if (_state.config.hooks.onXHRSuccess) {
                    _state.config.hooks.onXHRSuccess(result, resolve, reject);
                } else {
                    resolve(result);
                }
            });

            if (caller.hasOwnProperty('then')) {
                return caller.then(resolve).catch(reject);
            }
        }
    });
}

/**
 * checks if we are filtering in the url
 */
function isFiltering() {
    return !!_underscore2.default.keys(_underscore2.default.omit(parseParms(window.location.href.split('?')[1]), ['skip', 'take', 'page', ""])).length;
}

exports.default = {
    makeQueryString: makeQueryString,
    makeQueryObject: makeQueryObject,
    makeQueryObjectFromQueryString: makeQueryObjectFromQueryString,
    writeQueryStringToURL: writeQueryStringToURL,
    readQueryStringFromURL: readQueryStringFromURL,
    clearURLQueryString: clearURLQueryString,
    getViewParamFromURL: getViewParamFromURL,
    makeGraphQLRequest: makeGraphQLRequest,
    makeXHRRequest: makeXHRRequest,
    parseParms: parseParms,
    isFiltering: isFiltering
};