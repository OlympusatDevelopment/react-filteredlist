'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _elementReact = require('element-react');

var _en = require('element-react/src/locale/lang/en');

var _en2 = _interopRequireDefault(_en);

require('element-theme-chalk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

_elementReact.i18n.use(_en2.default);
var Option = _elementReact.Select.Option;

var AutoCompleteSelect = function (_Component) {
    _inherits(AutoCompleteSelect, _Component);

    function AutoCompleteSelect(props) {
        _classCallCheck(this, AutoCompleteSelect);

        var _this = _possibleConstructorReturn(this, (AutoCompleteSelect.__proto__ || Object.getPrototypeOf(AutoCompleteSelect)).call(this, props));

        _this.onSearch = function (query) {
            var options = _this.props.options;


            if (query !== '') {
                _this.setState({
                    loading: true
                });
                options.getOptions(query).then(function (items) {
                    console.log(items);
                    _this.setState({
                        loading: false,
                        items: items
                    });
                }).catch(function (err) {
                    return console.log(err);
                });
            } else {
                _this.setState({
                    items: []
                });
            }
        };

        _this.state = {
            items: [],
            loading: false,
            value: []
        };
        return _this;
    }

    _createClass(AutoCompleteSelect, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var initialValues = this.props.initialValues;

            if (initialValues) {
                this.setState({ items: initialValues });
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.setState({ options: [] });
        }
    }, {
        key: 'render',
        value: function render() {
            var items = this.state.items;
            var options = this.props.options;

            console.log(this.state.selected);
            return _react2.default.createElement(
                _elementReact.Select,
                { style: { width: '100%' }, clearable: true, size: 'large', value: this.state.value, multiple: true, filterable: true, remote: true, remoteMethod: this.onSearch, loading: this.state.loading },
                items && items.map(function (el) {
                    return _react2.default.createElement(Option, { key: el[options.key], value: el[options.value], label: el[options.value], selected: true });
                })
            );
        }
    }]);

    return AutoCompleteSelect;
}(_react.Component);

exports.default = AutoCompleteSelect;