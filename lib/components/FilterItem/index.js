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

var FilterItemActions = _interopRequireWildcard(_actions);

var _utils = require('../../utils');

var _reactSuperSelect = require('react-super-select');

var _reactSuperSelect2 = _interopRequireDefault(_reactSuperSelect);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _reactDates = require('react-dates');

var _reactCheckboxGroup = require('react-checkbox-group');

var _SortItem = require('../SortItem');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import Select from 'react-select';


var FilterItem = function (_Component) {
  _inherits(FilterItem, _Component);

  // eslint-disable-line react/prefer-stateless-function
  function FilterItem(props) {
    _classCallCheck(this, FilterItem);

    var _this = _possibleConstructorReturn(this, (FilterItem.__proto__ || Object.getPrototypeOf(FilterItem)).call(this, props));

    _this.state = {
      focusedInput: null,
      lastFocusedInput: null
    };

    _this.makeFilter = _this.makeFilter.bind(_this);
    _this.onSelectChange = _this.onSelectChange.bind(_this);
    _this.onSortClick = _this.onSortClick.bind(_this);
    _this.makeSelectInitialValue = _this.makeSelectInitialValue.bind(_this);
    return _this;
  }

  _createClass(FilterItem, [{
    key: 'onSelectChange',
    value: function onSelectChange(data) {
      var self = this,
          _props = this.props,
          options = _props.options,
          selectedView = _props.selectedView,
          filterChange = _props.filterChange,
          value = data && Array.isArray(data) ?
      // (Array.isArray(data[0].entityUUID)  ? data[0].entityUUID :
      data.map(function (obj) {
        console.log('OBJECT', obj);
        return obj[options.options.key];
      }) : data ? [data[options.options.key]] : null;


      filterChange({
        id: options.id,
        view: selectedView.id,
        value: value
      });
    }
  }, {
    key: 'onSortClick',
    value: function onSortClick(direction) {
      var self = this;
      var _props2 = this.props,
          options = _props2.options,
          selectedView = _props2.selectedView,
          filterChange = _props2.filterChange;


      filterChange({
        id: options.id,
        view: selectedView.id,
        value: direction
      });
    }

    /**
     * Returned as moment objects
     * @param startDate
     * @param endDate
     */

  }, {
    key: 'onRangeChange',
    value: function onRangeChange(_ref) {
      var startDate = _ref.startDate,
          endDate = _ref.endDate;
      var _props3 = this.props,
          options = _props3.options,
          selectedView = _props3.selectedView,
          filterChange = _props3.filterChange;


      if (startDate) {
        var local = (0, _moment2.default)(startDate.utc()).local();

        filterChange({
          id: options.id + '--start',
          view: selectedView.id,
          value: local.unix() * 1000
          //value : parseInt(startDate.unix()+'000',10)
        });
      }

      if (endDate) {
        var _local = (0, _moment2.default)(endDate.utc()).local();

        filterChange({
          id: options.id + '--end',
          view: selectedView.id,
          value: _local.unix() * 1000
        });
      }
    }
  }, {
    key: 'onRangeReset',
    value: function onRangeReset(e) {
      e.preventDefault();
      var _props4 = this.props,
          options = _props4.options,
          selectedView = _props4.selectedView,
          filterChange = _props4.filterChange;


      filterChange([{
        id: options.id + '--start',
        view: selectedView.id,
        value: null
      }, {
        id: options.id + '--end',
        view: selectedView.id,
        value: null
      }]);
    }
  }, {
    key: 'onRangeFocusChange',
    value: function onRangeFocusChange(focusedInput) {

      // State loop bug fix for dates component
      if (this.state.lastFocusedInput !== focusedInput) {
        this.setState({ lastFocusedInput: focusedInput, focusedInput: focusedInput });
      }
    }
  }, {
    key: 'handleCheckboxChange',
    value: function handleCheckboxChange(options, values) {
      var _props5 = this.props,
          selectedView = _props5.selectedView,
          filterChange = _props5.filterChange,
          optValues = options.options.getOptions();

      var value = [];

      optValues.forEach(function (collectionItem) {
        values.forEach(function (checkVal) {
          if (checkVal == collectionItem[options.options.key]) {
            value.push(collectionItem[options.options.key]);
          }
        });
      });

      filterChange({
        id: options.id,
        view: selectedView.id,
        value: value.length > 0 ? JSON.stringify(value) : null
      });
    }
  }, {
    key: 'makeFilter',
    value: function makeFilter(options) {
      var self = this,
          selectValue = {
        label: 'test',
        value: self.props.options.value
      };

      switch (self.props.options.type) {
        case 'range':
          return [_react2.default.createElement(
            'span',
            { key: Math.random() * 100000, className: 'dl__filterItemRangeClear' },
            _react2.default.createElement(
              'a',
              { href: '#', onClick: self.onRangeReset.bind(self) },
              'reset'
            )
          ), _react2.default.createElement(_reactDates.DateRangePicker, {
            key: Math.random() * 100000,
            startDate: options.range.start ? (0, _moment2.default)(options.range.start * 1) : (0, _moment2.default)() // .momentObj or null,
            , endDate: options.range.end ? (0, _moment2.default)(options.range.end * 1) : (0, _moment2.default)() // .momentObj or null,
            , onDatesChange: self.onRangeChange.bind(self) // .func.isRequired,
            , focusedInput: self.state.focusedInput // .oneOf([START_DATE, END_DATE]) or null,
            , onFocusChange: self.onRangeFocusChange.bind(self) // .func.isRequired,
            , isOutsideRange: function isOutsideRange() {
              return false;
            }
          })];
        case 'checkbox':
          var vals = [].concat(_toConsumableArray(decodeURIComponent(self.props.options.value)));

          // Handle reading url values @todo: fix the read later when we get more time
          if (vals[0] === "[" || vals[0] === "n" && vals[1] === "u") {
            vals = vals.join('');
          }

          try {
            vals = JSON.parse(vals);
          } catch (e) {}

          vals = vals === 'null' ? null : vals;

          //@todo .need to spend some time looking at why this component won't render checked values if the first render had no values.
          return _react2.default.createElement(
            _reactCheckboxGroup.CheckboxGroup,
            { name: options.id, values: vals, onChange: this.handleCheckboxChange.bind(this, options) },
            _react2.default.createElement(
              'div',
              { className: 'dl__filterItemCheckbox' },
              options.options.getOptions().map(function (option) {
                return _react2.default.createElement(
                  'label',
                  { key: Math.random() * 10000 },
                  _react2.default.createElement(_reactCheckboxGroup.Checkbox, { value: option[options.options.key] }),
                  option[options.options.value]
                );
              })
            )
          );
        case 'sort':
          return _react2.default.createElement(_SortItem.SortItem, { options: self.props.options, onClick: this.onSortClick });
          break;
        case 'select':
        default:
          var _val = null;
          var defaults = self.props.selectedView.filterDefaults ? self.props.selectedView.filterDefaults() : {};
          try {
            defaults = JSON.parse(defaults);
          } catch (e) {}

          // Decipher what set of defaults are to be used in the component options list
          if (defaults) {
            if (options.options && options.options.defaultsKey) {
              _val = defaults[options.options.defaultsKey] ? defaults[options.options.defaultsKey].filter(function (item) {
                return item[options.options.key] == self.props.options.value;
              })[0] : null;
            } else {
              _val = defaults[options.id] ? defaults[options.id].filter(function (item) {
                return item[options.options.key] == self.props.options.value;
              })[0] : null;
            }
          }

          // If a value exist via a query string run or state update, set the component initial val, otherwise leave blank to display the placeholder
          if (self.props.options.value) {
            return _react2.default.createElement(_reactSuperSelect2.default, {
              ajaxDataFetch: options.options.getOptions || [],
              optionLabelKey: options.options.value,
              optionValueKey: options.options.key,
              multiple: options.multi,
              initialValue: this.makeSelectInitialValue(options, defaults),
              placeholder: 'Make Your Selections',
              onChange: function onChange(data) {
                return self.onSelectChange(data);
              },
              searchable: false
            });
          } else {
            return _react2.default.createElement(_reactSuperSelect2.default, {
              ajaxDataFetch: options.options.getOptions || [],
              optionLabelKey: options.options.value,
              optionValueKey: options.options.key,
              multiple: options.multi,
              placeholder: 'Make Your Selections',
              onChange: function onChange(data) {
                return self.onSelectChange(data);
              },
              searchable: false
            });
          }
      }
    }

    /**
     * Makes the select components initial values based on either an incoming array of ids or a collection
     * @param {*} options 
     */

  }, {
    key: 'makeSelectInitialValue',
    value: function makeSelectInitialValue(options, defaults) {
      var _ref3;

      var self = this;

      var initVals = Array.isArray(self.props.options.value) ? self.props.options.value.map(function (v) {
        var _ref2;

        var defaultsExtract = defaults[self.props.options.id].filter(function (def) {
          return def[options.options.key] === v;
        })[0];

        return _ref2 = {}, _defineProperty(_ref2, options.options.key, v), _defineProperty(_ref2, options.options.value, defaultsExtract[options.options.value]), _ref2;
      } // entityValue
      ) : (_ref3 = {}, _defineProperty(_ref3, options.options.key, self.props.options.value), _defineProperty(_ref3, options.options.value, val ? val[options.options.value] : null), _ref3);

      console.log('INIT VALS', initVals);

      return initVals;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props6 = this.props,
          options = _props6.options,
          config = _props6.config,
          selectedView = _props6.selectedView,
          filter = this.makeFilter(options);

      var classNames = 'dl__filterItem ' + options.id;

      return _react2.default.createElement(
        'div',
        { className: classNames },
        _react2.default.createElement(
          'label',
          { htmlFor: options.id },
          options.label
        ),
        filter
      );
    }
  }]);

  return FilterItem;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    force: state.app.force,
    filterItem: state.filterItem
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(FilterItemActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FilterItem);