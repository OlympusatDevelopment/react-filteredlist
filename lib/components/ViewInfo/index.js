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

var ViewInfoActions = _interopRequireWildcard(_actions);

var _Pagination = require('../Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _copyToClipboard = require('copy-to-clipboard');

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ViewInfo = function (_Component) {
    _inherits(ViewInfo, _Component);

    // eslint-disable-line react/prefer-stateless-function
    function ViewInfo(props) {
        _classCallCheck(this, ViewInfo);

        return _possibleConstructorReturn(this, (ViewInfo.__proto__ || Object.getPrototypeOf(ViewInfo)).call(this, props));
    }

    _createClass(ViewInfo, [{
        key: 'copyToClipboard',
        value: function copyToClipboard() {
            var path = window.location.href;
            (0, _copyToClipboard2.default)(path);

            this.props.config.notify('Copied ' + path + ' to the clipboard', 'success', 'br');
        }
    }, {
        key: 'updatePagingDisplay',
        value: function updatePagingDisplay(s, ta, to) {
            var skip = parseInt(s, 10),
                take = parseInt(ta, 10),
                total = parseInt(to, 10);

            // Update display
            var num = skip + 1,
                of = skip + take > total ? total : skip + take;

            // Notify the user after Render
            if (total <= 0) {
                //appUtils.message('0 Results','warning');
                num = 0;
                of = 0;
            }

            return num + '-' + of + ' of ' + (total || 'loading...');
        }
    }, {
        key: 'makeViewInfo',
        value: function makeViewInfo() {
            var _props = this.props,
                options = _props.options,
                config = _props.config,
                pagination = _props.pagination,
                settings = options.infoDisplaySettings;

            var lines = [];

            if (settings.showIconStrip) {
                var icons = [];

                if (settings.showShareLink) {
                    icons.push(_react2.default.createElement(
                        'div',
                        { title: 'Share', className: 'dl__viewInfo--share', key: Math.random() * 10000, onClick: this.copyToClipboard.bind(this) },
                        ' '
                    ));
                }

                if (settings.iconComponents.length > 0) {
                    settings.iconComponents.forEach(function (Icon) {
                        icons.push(_react2.default.createElement(Icon, { key: Math.random() * 10000 }));
                    });
                }

                lines.push(_react2.default.createElement(
                    'li',
                    { key: Math.random() * 10000, className: 'dl__viewInfoIconStrip' },
                    icons
                ));
            }

            if (settings.showPaginationData) {
                lines.push(_react2.default.createElement(
                    'li',
                    { key: Math.random() * 10000, className: 'dl__viewInfoPaginationData' },
                    _react2.default.createElement(
                        'span',
                        { className: 'label' },
                        'Displaying'
                    ),
                    ' ',
                    _react2.default.createElement(
                        'span',
                        null,
                        this.updatePagingDisplay(pagination.skip, pagination.take, pagination.total)
                    )
                ));
            }

            //if(settings.showPagination){//Can't use two for now
            //    lines.push((<Pagination key={Math.random()*10000}> </Pagination>));
            //}

            return lines;
        }
    }, {
        key: 'render',
        value: function render() {
            var _props2 = this.props,
                options = _props2.options,
                config = _props2.config,
                viewInfo = this.makeViewInfo();


            return _react2.default.createElement(
                'ul',
                { className: 'dl__viewInfo' },
                viewInfo
            );
        }
    }]);

    return ViewInfo;
}(_react.Component);

function mapStateToProps(state, ownProps) {
    return {
        config: state.app.config,
        force: state.app.force,
        pagination: state.app.pagination
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(ViewInfoActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ViewInfo);