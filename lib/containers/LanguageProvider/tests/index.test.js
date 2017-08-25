'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _reactIntl = require('react-intl');

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

var _store = require('../../../store');

var _store2 = _interopRequireDefault(_store);

var _i18n = require('../../../i18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var messages = (0, _reactIntl.defineMessages)({
  someMessage: {
    id: 'some.id',
    defaultMessage: 'This is some default message',
    en: 'This is some en message'
  }
});

describe('<LanguageProvider />', function () {
  it('should render its children', function () {
    var children = _react2.default.createElement(
      'h1',
      null,
      'Test'
    );
    var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(
      _index.LanguageProvider,
      { messages: messages, locale: 'en' },
      children
    ));
    expect(renderedComponent.contains(children)).toBe(true);
  });
});

describe('<ConnectedLanguageProvider />', function () {
  var store = void 0;

  beforeAll(function () {
    store = (0, _store2.default)({}, _reactRouter.browserHistory);
  });

  it('should render the default language messages', function () {
    var renderedComponent = (0, _enzyme.mount)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _index2.default,
        { messages: _i18n.translationMessages },
        _react2.default.createElement(_reactIntl.FormattedMessage, messages.someMessage)
      )
    ));
    expect(renderedComponent.contains(_react2.default.createElement(_reactIntl.FormattedMessage, messages.someMessage))).toBe(true);
  });
});