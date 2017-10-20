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

var TextItemActions = _interopRequireWildcard(_actions);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _copyToClipboard = require('copy-to-clipboard');

var _copyToClipboard2 = _interopRequireDefault(_copyToClipboard);

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextItem = function (_Component) {
    _inherits(TextItem, _Component);

    // eslint-disable-line react/prefer-stateless-function
    function TextItem(props) {
        _classCallCheck(this, TextItem);

        var _this = _possibleConstructorReturn(this, (TextItem.__proto__ || Object.getPrototypeOf(TextItem)).call(this, props));

        _this.copyToClipboard = _this.copyToClipboard.bind(_this);
        return _this;
    }

    _createClass(TextItem, [{
        key: 'copyToClipboard',
        value: function copyToClipboard(val) {
            (0, _copyToClipboard2.default)(val);

            this.props.config.notify('Copied ' + val + ' to the clipboard', 'success', 'br');
        }
    }, {
        key: 'onLinkClick',
        value: function onLinkClick(e) {
            // Prevent linking when the copy icon is clicked
            if (e.target.classList.contains('dl__textItem-item--copy')) {
                e.preventDefault();
            }
        }
    }, {
        key: 'onChecked',
        value: function onChecked(e) {
            var _props = this.props,
                updateWorkspace = _props.updateWorkspace,
                item = _props.item,
                config = _props.config,
                workspaceItems = _props.workspaceItems,
                state = e.target.checked,
                workspaceAction = state ? 'add' : 'remove';


            if (state) {
                updateWorkspace({
                    Item: config.hooks.onCheck({ item: item, workspaceItems: workspaceItems }),
                    workspaceAction: workspaceAction
                });
            } else {
                updateWorkspace({
                    Item: config.hooks.onUnCheck({ item: item, workspaceItems: workspaceItems }),
                    workspaceAction: workspaceAction
                });
            }
        }
    }, {
        key: 'renderHTML',
        value: function renderHTML(html) {
            return _react2.default.createElement('span', { dangerouslySetInnerHTML: { __html: html }, title: html });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                item = _props2.item,
                selectedView = _props2.selectedView,
                preferencedProps = _props2.preferencedProps;

            var props = preferencedProps,
                check = selectedView.enableRowChecks ? _react2.default.createElement(
                'span',
                { key: -1, style: { width: '33px' }, className: 'dl__textItem-item' },
                _react2.default.createElement(
                    _Checkbox2.default,
                    { onChecked: this.onChecked.bind(this), id: item[selectedView.itemIdProp] },
                    ' '
                )
            ) : '';

            return _react2.default.createElement(
                'div',
                { className: 'dl__textItem' },
                _react2.default.createElement(
                    'a',
                    { target: selectedView.link.target, href: selectedView.link.row(item), onClick: this.onLinkClick.bind(this) },
                    check,
                    props.map(function (prop) {
                        var id = item[prop.idKey],
                            val = item[prop.key],
                            hookedVal = prop.hasOwnProperty('before') ? prop.before(val, item) : val,
                            parsedVal = prop.isDate ? (0, _utils.makeHumanDate)(hookedVal) : _this2.renderHTML(hookedVal),
                            copyIcon = prop.hasCopy ? _react2.default.createElement(
                            'span',
                            { className: 'dl__textItem-item--copy', onClick: _this2.copyToClipboard.bind(_this2, parsedVal) },
                            ' '
                        ) : '';

                        if (prop.display) {
                            return _react2.default.createElement(
                                'span',
                                { key: prop.key, 'data-id': id, style: { width: prop.width }, className: 'dl__textItem-item' },
                                copyIcon,
                                parsedVal
                            );
                        }
                    })
                )
            );
        }
    }]);

    return TextItem;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
    return {
        config: state.app.config,
        workspaceItems: state.app.workspaceItems,
        force: state.app.force
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(TextItemActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TextItem);