'use strict';

var _selectors = require('../selectors');

describe('selectLanguage', function () {
  it('should select the global state', function () {
    var globalState = {};
    var mockedState = {
      language: globalState
    };
    expect((0, _selectors.selectLanguage)(mockedState)).toEqual(globalState);
  });
});