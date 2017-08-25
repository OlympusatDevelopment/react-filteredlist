'use strict';

var _reducer = require('../reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('languageProviderReducer', function () {
  it('returns the initial state', function () {
    expect((0, _reducer2.default)(undefined, {})).toEqual({
      locale: 'en'
    });
  });

  it('changes the locale', function () {
    expect((0, _reducer2.default)(undefined, { type: _constants.CHANGE_LOCALE, locale: 'de' }).toJS()).toEqual({
      locale: 'de'
    });
  });
});