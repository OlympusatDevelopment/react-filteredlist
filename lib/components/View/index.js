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

var ViewActions = _interopRequireWildcard(_actions);

var _FilterGroup = require('../FilterGroup');

var _FilterGroup2 = _interopRequireDefault(_FilterGroup);

var _Search = require('../../components/Search');

var _Search2 = _interopRequireDefault(_Search);

var _ViewInfo = require('../../components/ViewInfo');

var _ViewInfo2 = _interopRequireDefault(_ViewInfo);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var View = function (_Component) {
    _inherits(View, _Component);

    // eslint-disable-line react/prefer-stateless-function
    function View(props) {
        _classCallCheck(this, View);

        return _possibleConstructorReturn(this, (View.__proto__ || Object.getPrototypeOf(View)).call(this, props));
    }

    _createClass(View, [{
        key: 'resetFilters',
        value: function resetFilters() {
            this.props.resetFilters();
        }
    }, {
        key: 'makeActiveView',
        value: function makeActiveView(options) {
            var ar = [_react2.default.createElement(
                _ViewInfo2.default,
                { key: Math.random() * 10000, options: options },
                ' '
            )];

            if (options.showSearch) {
                ar.push(_react2.default.createElement(
                    _Search2.default,
                    { key: Math.random() * 10000, options: options },
                    ' '
                ));
            }

            ar.push(options.filterGroups.map(function (filterGroup, i) {
                return _react2.default.createElement(
                    _FilterGroup2.default,
                    { key: Math.random() * 10000, selectedView: options, options: filterGroup, isSingle: options.filterGroups.length === 1 },
                    ' '
                );
            }));

            if (options.showResetFiltersButton) {
                ar.push(_react2.default.createElement(
                    'button',
                    { key: Math.random() * 10000, className: 'dl__reset', onClick: this.resetFilters.bind(this) },
                    'Reset Filters'
                ));
            }

            return ar;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                options = _props.options,
                config = _props.config,
                isActiveView = _props.isActiveView,
                isSingle = _props.isSingle,
                activeView = isActiveView ? this.makeActiveView(options) : '';


            return _react2.default.createElement(
                'div',
                { className: 'dl__view', 'data-issingle': isSingle, 'data-active': isActiveView },
                activeView
            );
        }
    }]);

    return View;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
    return {
        config: state.app.config,
        view: state.view
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(ViewActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(View);