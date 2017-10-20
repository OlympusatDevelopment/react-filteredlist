'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SortItem = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SortItem = exports.SortItem = function (_Component) {
    _inherits(SortItem, _Component);

    function SortItem(props) {
        _classCallCheck(this, SortItem);

        var _this = _possibleConstructorReturn(this, (SortItem.__proto__ || Object.getPrototypeOf(SortItem)).call(this, props));

        _this.state = {

            // Convert asc/desc to boolean for easy toggling
            asc: props.options.value === null ? true : props.options.value === 'asc'
        };

        _this.onSortClick = _this.onSortClick.bind(_this);
        return _this;
    }

    _createClass(SortItem, [{
        key: 'onSortClick',
        value: function onSortClick(e) {
            var asc = !this.state.asc;

            if (!e.target.classList.contains('dl__sortItem--clear')) {
                this.setState({ asc: asc });
                this.props.onClick(asc ? 'asc' : 'desc');
            } else {
                // Handle the clear button click
                this.props.onClick(null);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                options = _props.options,
                selectedView = _props.selectedView,
                onClick = _props.onClick;

            var orderClass = (options.value === null ? true : options.value === 'asc') ? 'dl__sortItem--asc' : 'dl__sortItem--desc';
            var clearSort = options.value ? _react2.default.createElement('span', { className: 'dl__sortItem--clear' }) : '';

            return _react2.default.createElement(
                'li',
                { className: 'dl__sortItem', onClick: this.onSortClick },
                _react2.default.createElement('span', null),
                _react2.default.createElement(
                    'span',
                    null,
                    _utils2.default.propToTitleCase(options.id.split('-')[1])
                ),
                clearSort,
                _react2.default.createElement('span', { className: orderClass })
            );
        }
    }]);

    return SortItem;
}(_react.Component);