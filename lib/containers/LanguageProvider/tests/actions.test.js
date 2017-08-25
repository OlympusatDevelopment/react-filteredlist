'use strict';

var _actions = require('../actions');

var _constants = require('../constants');

describe('LanguageProvider actions', function () {
  describe('Change Local Action', function () {
    it('has a type of CHANGE_LOCALE', function () {
      var expected = {
        type: _constants.CHANGE_LOCALE,
        locale: 'de'
      };
      expect((0, _actions.changeLocale)('de')).toEqual(expected);
    });
  });
});