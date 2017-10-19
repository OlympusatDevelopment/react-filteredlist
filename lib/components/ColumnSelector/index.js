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

var ColumnSelectorActions = _interopRequireWildcard(_actions);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnSelector = function (_Component) {
  _inherits(ColumnSelector, _Component);

  // eslint-disable-line react/prefer-stateless-function
  function ColumnSelector(props) {
    _classCallCheck(this, ColumnSelector);

    return _possibleConstructorReturn(this, (ColumnSelector.__proto__ || Object.getPrototypeOf(ColumnSelector)).call(this, props));
  }

  _createClass(ColumnSelector, [{
    key: 'onChecked',
    value: function onChecked(e, prop) {
      var checked = e.target.checked,
          viewId = this.props.selectedView.id;
      //viewProp = {
      //    key:prop,
      //    label:utils.propToTitleCase(prop),
      //    hasCopy:false,// Assume false for these advanced settings
      //    isDate:prop.toLowerCase().indexOf('date') > -1,// Best guess. Looks for prop names that have date
      //    width:'125px'// @todo need to find a way to safely generate widths when props are added to the view. Could use property keys length as a divisor
      //};

      this.props.updateViewProps({ prop: prop, checked: checked, viewId: viewId });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          currentViewProps = _props.currentViewProps,
          config = _props.config,
          item = _props.item,
          selectedView = _props.selectedView;

      var availableProps = currentViewProps.map(function (prop) {
        return prop.key;
      });
      return _react2.default.createElement(
        'div',
        { className: 'dl__columnSelector' },
        _react2.default.createElement(
          'h4',
          null,
          'Show'
        ),
        availableProps.map(function (prop) {
          var propObject = _underscore2.default.findWhere(currentViewProps, { key: prop }) || {};

          return _react2.default.createElement(
            'span',
            { key: prop, 'data-key': prop },
            _react2.default.createElement(
              _Checkbox2.default,
              { onChecked: _this2.onChecked.bind(_this2), id: prop, checked: propObject.display, onChange: function onChange() {} },
              ' '
            ),
            _utils2.default.propToTitleCase(prop)
          );
        })
      );
    }
  }]);

  return ColumnSelector;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    force: state.app.force,
    columnSelector: state.columnSelector
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(ColumnSelectorActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ColumnSelector);