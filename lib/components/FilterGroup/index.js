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

var FilterGroupActions = _interopRequireWildcard(_actions);

var _FilterItem = require('../FilterItem');

var _FilterItem2 = _interopRequireDefault(_FilterItem);

var _SaveFilterset = require('../SaveFilterset');

var _SaveFilterset2 = _interopRequireDefault(_SaveFilterset);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FilterGroup = function (_Component) {
    _inherits(FilterGroup, _Component);

    // eslint-disable-line react/prefer-stateless-function
    function FilterGroup(props) {
        _classCallCheck(this, FilterGroup);

        return _possibleConstructorReturn(this, (FilterGroup.__proto__ || Object.getPrototypeOf(FilterGroup)).call(this, props));
    }

    _createClass(FilterGroup, [{
        key: 'toggleFilterAccordian',
        value: function toggleFilterAccordian(e) {
            var elem = e.target,
                node = elem.parentNode,
                cls = 'dl__filterGroup--open';

            if (node.classList.contains(cls)) {
                node.classList.remove(cls);
            } else {
                node.classList.add(cls);
            }

            if (elem.classList.contains(cls)) {
                elem.classList.remove(cls);
            } else {
                elem.classList.add(cls);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                options = _props.options,
                config = _props.config,
                isSingle = _props.isSingle,
                selectedView = _props.selectedView;

            var classNames = options.defaultOpen ? 'dl__filterGroup dl__filterGroup--open ' + options.id : 'dl__filterGroup ' + options.id,
                filtersets = options.hasOwnProperty('id') && options.id === 'filterset' && selectedView.showSaveFiltersInterface ? _react2.default.createElement(_SaveFilterset2.default, { selectedView: selectedView, key: Math.random() * 10000 }) : '';

            return _react2.default.createElement(
                'div',
                { className: classNames, style: { color: options.accordian.color.text }, 'data-issingle': isSingle, onClick: this.toggleFilterAccordian.bind(this) },
                _react2.default.createElement(
                    'div',
                    { className: 'dl__filterGroupLabel', style: { background: options.accordian.color.background } },
                    _react2.default.createElement(
                        'span',
                        { style: { color: options.accordian.color.text } },
                        options.label
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'dl__filterGroupFilters' },
                    options.filters.map(function (filter, i) {
                        return _react2.default.createElement(
                            _FilterItem2.default,
                            { key: i, options: filter, selectedView: selectedView },
                            ' '
                        );
                    }),
                    filtersets
                )
            );
        }
    }]);

    return FilterGroup;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
    return {
        config: state.app.config,
        filterGroup: state.filterGroup
    };
}

function mapDispatchToProps(dispatch) {
    return (0, _redux.bindActionCreators)(FilterGroupActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FilterGroup);