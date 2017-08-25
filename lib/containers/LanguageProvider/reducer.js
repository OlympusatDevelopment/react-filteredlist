'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

var _constants2 = require('../App/constants');

// eslint-disable-line

/*
 *
 * LanguageProvider reducer
 *
 */
var initialState = {
  locale: _constants2.DEFAULT_LOCALE
};

function languageProviderReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case _constants.CHANGE_LOCALE:
      return state.set('locale', action.locale);
    default:
      return state;
  }
}

exports.default = languageProviderReducer;