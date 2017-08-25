'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('./constants');

// //@todo find a better place to inject this
// import config from '../../../dataListConfig';

var initialState = {
  //   config
};

function saveFiltersetReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var _state = _extends({}, state),
      _data = action.data;

  switch (action.type) {

    default:
      return _state;
  }
}

exports.default = saveFiltersetReducer;