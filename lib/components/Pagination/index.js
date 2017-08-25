'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _actions = require('./actions');

var PaginationActions = _interopRequireWildcard(_actions);

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
//import {queries} from  '../../utils';


var history = (0, _createBrowserHistory2.default)();

var Pagination = function (_Component) {
    _inherits(Pagination, _Component);

    function Pagination(props) {
        _classCallCheck(this, Pagination);

        var _this = _possibleConstructorReturn(this, (Pagination.__proto__ || Object.getPrototypeOf(Pagination)).call(this, props));

        _this.state = {
            currentPage: props.pagination.page,
            totalPages: 0,
            pagination: props.pagination
        };
        return _this;
    }

    _createClass(Pagination, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var pagination = nextProps.pagination,
                self = this;

            // Init the state
            self.runStateUpdate(pagination);
            this.startComputation();
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var pagination = this.props.pagination,
                self = this;

            // Init the state
            self.runStateUpdate(pagination);
            this.startComputation();
        }

        /**
         * Listens for list changes to update the current page data
         */

    }, {
        key: 'startComputation',
        value: function startComputation() {
            var self = this;

            var runPagingComputation = function runPagingComputation(self) {
                var _self$props = self.props,
                    config = _self$props.config,
                    pagination = _self$props.pagination,
                    totalPages = Math.ceil(pagination.total / pagination.take);

                var currentPage = 1;

                // Make current page
                if (isFinite(pagination.skip / pagination.take)) {
                    switch (Math.floor(pagination.skip / pagination.take)) {
                        case 0:
                            //Skip was zero = page 1
                            currentPage = 1;
                            break;
                        case 1:
                            //skip is same as take = page 2
                            currentPage = 2;
                            break;
                        default:
                            currentPage = Math.floor(pagination.skip / pagination.take) + 1;
                            break;
                    }
                }

                //page === 1 ? 0 : page * (this.state.pagination.take) - this.state.pagination.take,

                // Handle busted query strings. Happens when the last query to set the url had more results
                // than the current query. Can happen when result amounts change as well.
                if (currentPage > totalPages) {
                    currentPage = 0;
                    self.writeQueryStringToURL('?skip=0&take=' + pagination.take + '&page=1');
                }

                self.setState({
                    pagination: pagination,
                    totalPages: totalPages,
                    currentPage: currentPage
                });
            };

            runPagingComputation(self);

            document.addEventListener('renderToStore', function (e) {
                runPagingComputation(self);
            });
        }

        /**
         * Closure to handle setting state
         * @param pagination
         */

    }, {
        key: 'runStateUpdate',
        value: function runStateUpdate(pagination) {
            var totalPages = Math.ceil(pagination.total / pagination.take),
                currentPage = isFinite(pagination.total / pagination.skip) ? Math.ceil(pagination.total / pagination.skip) : 1;

            this.setState({
                pagination: pagination,
                totalPages: totalPages,
                currentPage: currentPage
            });
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var page = 1;

            switch (e.currentTarget.getAttribute('data-action')) {
                case 'first':
                    break;
                case 'prev':
                    page = this.state.currentPage === 1 ? 1 : this.state.currentPage - 1;
                    break;
                case 'next':
                    page = this.state.currentPage === this.state.totalPages ? this.state.totalPages : this.state.currentPage + 1;
                    break;
                case 'last':
                    page = this.state.totalPages;
                    break;
            }

            var calculatedSkip = page === 1 ? 0 : page * this.state.pagination.take - this.state.pagination.take,
                event = {
                skip: calculatedSkip,
                take: this.state.pagination.take,
                page: page
            };

            if (this.state.currentPage !== page) {
                this.sendEvent(event).writeQueryStringToURL('?skip=' + event.skip + '&take=' + event.take + '&page=' + event.page);
            }

            this.setState({ currentPage: page });
        }

        /**
         * Data binding to the input for manual page value entry
         * @param e
         */

    }, {
        key: 'handleInputChange',
        value: function handleInputChange(e) {
            var page = e.currentTarget.value;

            if (page <= this.state.totalPages && page > 0) {
                this.setState({ currentPage: page });
            } else {
                this.setState({ currentPage: this.state.currentPage });
            }
        }
    }, {
        key: 'handleSubmit',
        value: function handleSubmit(e) {
            e.preventDefault();
            var page = document.getElementById('dl__pagination__currentPage').value,
                calculatedSkip = page === 1 ? 0 : page * this.state.pagination.take - this.state.pagination.take,
                event = {
                skip: calculatedSkip,
                take: this.state.pagination.take,
                page: page
            };

            if (page <= this.state.totalPages) {
                this.sendEvent(event).writeQueryStringToURL('?skip=' + event.skip + '&take=' + event.take + '&page=' + event.page);
            }
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(e) {
            var page = e.currentTarget.value,
                calculatedSkip = page === 1 ? 0 : page * this.state.pagination.take - this.state.pagination.take;

            var event = {
                skip: calculatedSkip,
                take: this.state.pagination.take,
                page: page
            };

            if (page <= this.state.totalPages) {
                this.sendEvent(event).writeQueryStringToURL('?skip=' + event.skip + '&take=' + event.take + '&page=' + event.page).setState({ currentPage: page });
            } else {
                this.setState({ currentPage: this.state.totalPages });
            }
        }

        /**
         * Send the change event
         * @param e
         */

    }, {
        key: 'sendEvent',
        value: function sendEvent(e) {
            var _props = this.props,
                config = _props.config,
                updatePagination = _props.updatePagination,
                eventData = _extends({}, e, { id: 'dl__items__' + config.id });

            // Dispatch the redux event before the DOM evt


            updatePagination({ pagination: eventData });

            // Broadcast the change event, Listeners: App/index.js _initPagination() & the redux store via dispatch
            var elem = document,
                event = elem.createEvent('Event');
            event.initEvent('paginationChange', true, true);
            event.data = eventData;
            document.dispatchEvent(event);

            return this;
        }

        /**
         * Gets the pagination specific hash properties and converts to an obj for digestion
         */

    }, {
        key: 'readHashProps',
        value: function readHashProps() {
            return _underscore2.default.pick(this.parseParms(window.location.href.split('?')[1]), ['skip', 'take', 'page']);
        }

        /**
         * From: http://stackoverflow.com/questions/23481979/function-to-convert-url-hash-parameters-into-object-key-value-pairs
         * @param str
         * @returns {{}}
         */

    }, {
        key: 'parseParms',
        value: function parseParms() {
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
         * Handles writing to the url if selected by config
         * @param queryString
         */

    }, {
        key: 'writeQueryStringToURL',
        value: function writeQueryStringToURL(queryString) {
            var pagination = this.props.pagination,
                self = this,
                path = window.location.href.split('?')[0].split(window.location.host)[1]; //@todo check if this works on production

            // The delay is import for handling what looks like a conflict with Meteor's iron-router
            //@todo may be able to remove this from filterSort component not in a Meteor site
            setTimeout(function () {
                history.replace(path + queryString + '&' + self.getExistingQueryParams());
            }, 1000);

            return this;
        }

        /**
         * Gets the pagination query params from the url to preserve them on write
         */

    }, {
        key: 'getExistingQueryParams',
        value: function getExistingQueryParams() {
            var params = _underscore2.default.omit(this.parseParms(window.location.href.split('?')[1]), ['skip', 'take', 'page', ""]);
            var str = '';

            for (var key in params) {
                str += key + '=' + params[key] + '&';
            }

            return str === '=&' ? '' : str.slice(0, -1); // removes the last ampersand
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                config = _props2.config,
                bottom = _props2.bottom,
                classNames = config.pinPagination ? 'dl__pagination dl__pinPagination' : 'dl__pagination';


            return _react2.default.createElement(
                'div',
                { className: classNames, style: { bottom: bottom } },
                _react2.default.createElement(
                    'div',
                    { className: 'dl__pagination__wrapper' },
                    _react2.default.createElement('div', { className: 'dl__pagination__first', 'data-action': 'first', onClick: this.handleClick.bind(this) }),
                    _react2.default.createElement('div', { className: 'dl__pagination__prev', 'data-action': 'prev', onClick: this.handleClick.bind(this) }),
                    _react2.default.createElement(
                        'div',
                        { className: 'dl__pagination__indicator' },
                        _react2.default.createElement(
                            'span',
                            null,
                            'Page\xA0'
                        ),
                        _react2.default.createElement(
                            'form',
                            { id: 'dl__pagination__pageForm', onSubmit: this.handleSubmit.bind(this) },
                            _react2.default.createElement('input', { type: 'text', id: 'dl__pagination__currentPage', value: this.state.currentPage, onChange: this.handleInputChange.bind(this), onBlur: this.handleBlur.bind(this) })
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            '\xA0of'
                        ),
                        _react2.default.createElement(
                            'span',
                            null,
                            this.state.totalPages || 'loading...'
                        )
                    ),
                    _react2.default.createElement('div', { className: 'dl__pagination__next', 'data-action': 'next', onClick: this.handleClick.bind(this) }),
                    _react2.default.createElement('div', { className: 'dl__pagination__last', 'data-action': 'last', onClick: this.handleClick.bind(this) })
                )
            );
        }
    }]);

    return Pagination;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
    return {
        config: state.app.config,
        pagination: state.app.pagination,
        force: state.app.force
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(PaginationActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Pagination);