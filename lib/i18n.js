'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translationMessages = exports.formatTranslationMessages = exports.appLocales = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * i18n.js
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   * This will setup the i18n language files and locale data for your app.
                                                                                                                                                                                                                                                                   *
                                                                                                                                                                                                                                                                   */
// eslint-disable-line


var _reactIntl = require('react-intl');

var _en = require('react-intl/locale-data/en');

var _en2 = _interopRequireDefault(_en);

var _constants = require('./containers/App/constants');

var _en3 = require('./translations/en.json');

var _en4 = _interopRequireDefault(_en3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var appLocales = exports.appLocales = ['en'];

(0, _reactIntl.addLocaleData)(_en2.default);

var formatTranslationMessages = exports.formatTranslationMessages = function formatTranslationMessages(locale, messages) {
  var defaultFormattedMessages = locale !== _constants.DEFAULT_LOCALE ? formatTranslationMessages(_constants.DEFAULT_LOCALE, _en4.default) : {};
  return Object.keys(messages).reduce(function (formattedMessages, key) {
    var message = messages[key];
    if (!message && locale !== _constants.DEFAULT_LOCALE) {
      message = defaultFormattedMessages[key];
    }
    return _extends(formattedMessages, _defineProperty({}, key, message));
  }, {});
};

var translationMessages = exports.translationMessages = {
  en: formatTranslationMessages('en', _en4.default)
};