'use strict';

var _constants = require('../containers/App/constants');

var _i18n = require('../i18n');

jest.mock('../translations/en.json', function () {
  return {
    message1: 'default message',
    message2: 'default message 2'
  };
});

var esTranslationMessages = {
  message1: 'mensaje predeterminado',
  message2: ''
};

describe('formatTranslationMessages', function () {
  it('should build only defaults when DEFAULT_LOCALE', function () {
    var result = (0, _i18n.formatTranslationMessages)(_constants.DEFAULT_LOCALE, { a: 'a' });

    expect(result).toEqual({ a: 'a' });
  });

  it('should combine default locale and current locale when not DEFAULT_LOCALE', function () {
    var result = (0, _i18n.formatTranslationMessages)('', esTranslationMessages);

    expect(result).toEqual({
      message1: 'mensaje predeterminado',
      message2: 'default message 2'
    });
  });
});