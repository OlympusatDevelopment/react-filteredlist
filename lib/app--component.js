'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _App = require('./containers/App');

var _App2 = _interopRequireDefault(_App);

var _LanguageProvider = require('./containers/LanguageProvider');

var _LanguageProvider2 = _interopRequireDefault(_LanguageProvider);

var _store = require('./store');

var _store2 = _interopRequireDefault(_store);

var _i18n = require('./i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * app.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This is the entry file for the application, only setup and boilerplate
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * code.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

// Needed for redux-saga es6 generator support
//import 'babel-polyfill';

// Import all the third party stuff

//import 'sanitize.css/sanitize.css';

// Import root app


// Import Language Provider


// Import CSS reset and Global Styles
//import './global-styles';
//import './style/main.scss';

// Import i18n messages


// Create redux store with historys
var initialState = {};

var store = (0, _store2.default)(initialState);

var DataList = function (_Component) {
    _inherits(DataList, _Component);

    function DataList() {
        _classCallCheck(this, DataList);

        return _possibleConstructorReturn(this, (DataList.__proto__ || Object.getPrototypeOf(DataList)).call(this));
    }

    _createClass(DataList, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(
                    _LanguageProvider2.default,
                    { locale: 'en', messages: _i18n.translationMessages },
                    _react2.default.createElement(
                        _App2.default,
                        { dataListConfig: this.props.config },
                        ' '
                    )
                )
            );
        }
    }]);

    return DataList;
}(_react.Component);

exports.default = DataList;
//exports.default = DataList;