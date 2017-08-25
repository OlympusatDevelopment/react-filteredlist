'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeLocale = changeLocale;

var _constants = require('./constants');

function changeLocale(languageLocale) {
  return {
    type: _constants.CHANGE_LOCALE,
    locale: languageLocale
  };
} /*
   *
   * LanguageProvider actions
   *
   */