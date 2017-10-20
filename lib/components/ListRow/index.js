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

var ListRowActions = _interopRequireWildcard(_actions);

var _TextItem = require('../TextItem');

var _TextItem2 = _interopRequireDefault(_TextItem);

var _DisplayItem = require('../DisplayItem');

var _DisplayItem2 = _interopRequireDefault(_DisplayItem);

var _CustomItem = require('../CustomItem');

var _CustomItem2 = _interopRequireDefault(_CustomItem);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListRow = function (_Component) {
    _inherits(ListRow, _Component);

    // eslint-disable-line react/prefer-stateless-function
    function ListRow(props) {
        _classCallCheck(this, ListRow);

        var _this = _possibleConstructorReturn(this, (ListRow.__proto__ || Object.getPrototypeOf(ListRow)).call(this, props));

        _this.state = {
            renderDropdown: false
        };
        return _this;
    }

    _createClass(ListRow, [{
        key: 'makeListItem',
        value: function makeListItem(item, selectedView, props) {
            switch (selectedView.displayType) {
                case 'custom':
                    var CustomDisplayItem = selectedView.customDisplayTypeComponent;

                    return _react2.default.createElement(_CustomItem2.default, { CustomDisplayItem: CustomDisplayItem, item: item, selectedView: selectedView, parentProps: props });
                case 'display':
                    return _react2.default.createElement(_DisplayItem2.default, { item: item, selectedView: selectedView });
                case 'text':
                default:
                    return _react2.default.createElement(_TextItem2.default, { item: item, selectedView: selectedView });
            }
        }

        /**
         * Renders dropdown on chevron click
         * @param {Event} e 
         */

    }, {
        key: 'onChevronClick',
        value: function onChevronClick(e) {
            e.preventDefault();

            this.setState({ renderDropdown: !this.state.renderDropdown });
            return false;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                config = _props.config,
                item = _props.item,
                selectedView = _props.selectedView;

            var listItem = this.makeListItem(item, selectedView, this.props);
            var DropdownComponent = selectedView.rowDropdownComponent; // Component for dropdown details
            var dropdownClassList = selectedView.dropdownClassList;

            return _react2.default.createElement(
                'li',
                { className: 'dl__listRow ' + (selectedView.enableRowDropdown ? dropdownClassList : '') },
                selectedView.enableRowDropdown && _react2.default.createElement('span', { onClick: function onClick(e) {
                        _this2.onChevronClick(e);
                    }, className: 'chevron--open-' + this.state.renderDropdown }),
                listItem,
                selectedView.enableRowDropdown && this.state.renderDropdown && _react2.default.createElement(DropdownComponent, { item: item, selectedView: selectedView })
            );
        }
    }]);

    return ListRow;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
    return {
        config: state.app.config,
        listRow: state.listRow
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(ListRowActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ListRow);