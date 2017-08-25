'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var DataListActions = _interopRequireWildcard(_actions);

var _ListHeader = require('../../components/ListHeader');

var _ListHeader2 = _interopRequireDefault(_ListHeader);

var _ListFooter = require('../../components/ListFooter');

var _ListFooter2 = _interopRequireDefault(_ListFooter);

var _ListRow = require('../../components/ListRow');

var _ListRow2 = _interopRequireDefault(_ListRow);

var _Pagination = require('../../components/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataList = function (_Component) {
    _inherits(DataList, _Component);

    // eslint-disable-line react/prefer-stateless-function
    function DataList(props) {
        _classCallCheck(this, DataList);

        return _possibleConstructorReturn(this, (DataList.__proto__ || Object.getPrototypeOf(DataList)).call(this, props));
    }

    _createClass(DataList, [{
        key: 'makeDataList',
        value: function makeDataList(Items, selectedView) {
            return Items.map(function (item, i) {
                return _react2.default.createElement(
                    _ListRow2.default,
                    { key: i, item: item, selectedView: selectedView },
                    ' '
                );
            });
        }
    }, {
        key: 'makeNoResults',
        value: function makeNoResults(noResultsMessage) {
            var message = noResultsMessage ? noResultsMessage : "No Results Found...";

            return _react2.default.createElement(
                'li',
                { className: 'dl__dataList--noResults' },
                _react2.default.createElement(
                    'h1',
                    null,
                    message
                )
            );
        }
    }, {
        key: 'makeLoading',
        value: function makeLoading(Placeholder, total) {
            // return (
            //     // <li className="dl__dataList--loading">
            //     //     <h1>Loading...</h1>
            //     //     <div> </div>
            //     // </li>
            // );
            var placeholders = [];

            for (var i = 0; i < total; i++) {
                placeholders.push(_react2.default.createElement(Placeholder, { key: Math.random() * 1000 + i }));
            }

            return placeholders;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                config = _props.config,
                selectedView = _props.selectedView,
                _props$Items = _props.Items,
                Items = _props$Items === undefined ? [] : _props$Items,
                showLoading = _props.showLoading,
                width = _props.width,
                listItems = showLoading ? this.makeLoading(selectedView.customContentPlaceholder, selectedView.customContentPlaceholderAmount) : Items && Items.length > 0 ? this.makeDataList(Items, selectedView) : this.makeNoResults(selectedView.noResultsMessage),
                classNames = config.pinPagination ? 'dl__dataList dl__pinPagination' : 'dl__dataList',
                listHeader = selectedView.showListHeader ? _react2.default.createElement(
                _ListHeader2.default,
                { selectedView: selectedView, item: Items[0] },
                ' '
            ) : '',
                pagination = Items && Items.length > 0 ? _react2.default.createElement(
                _Pagination2.default,
                { bottom: config.dataList.paginationBottomPosition },
                ' '
            ) : '';


            return _react2.default.createElement(
                'div',
                { className: classNames, style: { height: config.dataList.height, width: width } },
                listHeader,
                _react2.default.createElement(
                    'div',
                    { className: 'dl__dataListWrapper', style: { overflowY: config.dataList.overflowY } },
                    _react2.default.createElement(
                        'ul',
                        { className: 'dl__dataList-list' },
                        listItems
                    )
                ),
                pagination,
                _react2.default.createElement(
                    _ListFooter2.default,
                    null,
                    ' '
                )
            );
        }
    }]);

    return DataList;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
    return {
        config: state.app.config,
        selectedView: state.app.selectedView,
        force: state.app.force,
        dataList: state.dataList,
        showLoading: state.app.showLoading
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(DataListActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DataList);