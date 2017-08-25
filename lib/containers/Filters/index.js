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

var _actions = require('./actions');

var FiltersActions = _interopRequireWildcard(_actions);

var _View = require('../../components/View');

var _View2 = _interopRequireDefault(_View);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Filters = function (_Component) {
    _inherits(Filters, _Component);

    // eslint-disable-line react/prefer-stateless-function
    function Filters(props) {
        _classCallCheck(this, Filters);

        return _possibleConstructorReturn(this, (Filters.__proto__ || Object.getPrototypeOf(Filters)).call(this, props));
    }

    _createClass(Filters, [{
        key: 'onTabClick',
        value: function onTabClick(id) {
            this.props.updateCurrentTab(id);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                config = _props.config,
                selectedView = _props.selectedView,
                views = _props.views,
                className = _props.className,
                viewTabs = selectedView.showTabsHeader ? _react2.default.createElement(
                'div',
                { className: 'dl__viewTabs', style: _extends({}, selectedView.tabHeaderStyles) },
                selectedView.showTabs ? views.map(function (view, i) {
                    //Make the view tabs, if there are more than one
                    return _react2.default.createElement(
                        'span',
                        { key: i, className: 'dl__viewTab', onClick: _this2.onTabClick.bind(_this2, view.id), 'data-issingle': config.views.length === 1, 'data-active': view.id === selectedView.id },
                        view.label
                    );
                }) : ''
            ) : '',
                cNames = 'dl__filters ' + className;


            return _react2.default.createElement(
                'div',
                { className: cNames },
                _react2.default.createElement(
                    'h3',
                    null,
                    config.filtersLabel
                ),
                viewTabs,
                views.map(function (view, i) {
                    return _react2.default.createElement(
                        _View2.default,
                        { key: i, options: view, isSingle: config.views.length === 1, isActiveView: view.id === selectedView.id },
                        ' '
                    );
                })
            );
        }
    }]);

    return Filters;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
    return {
        config: state.app.config,
        views: state.app.views,
        selectedView: state.app.selectedView,
        filters: state.filters
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(FiltersActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Filters);