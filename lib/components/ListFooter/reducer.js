'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

//@todo find a better place to inject this


require('./constants');

var _dataListConfig = require('../../../dataListConfig');

var _dataListConfig2 = _interopRequireDefault(_dataListConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  config: _dataListConfig2.default
};

function listFooterReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var _state = _extends({}, state),
      _data = action.data;

  switch (action.type) {

    default:
      return _state;
  }
}

exports.default = listFooterReducer;