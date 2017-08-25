'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Test store addons
                                                                                                                                                                                                                                                                               */

var _reactRouter = require('react-router');

var _store = require('../store');

var _store2 = _interopRequireDefault(_store);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('configureStore', function () {
  var store = void 0;

  beforeAll(function () {
    store = (0, _store2.default)({}, _reactRouter.browserHistory);
  });

  describe('asyncReducers', function () {
    it('should contain an object for async reducers', function () {
      expect(_typeof(store.asyncReducers)).toBe('object');
    });
  });

  describe('runSaga', function () {
    it('should contain a hook for `sagaMiddleware.run`', function () {
      expect(_typeof(store.runSaga)).toBe('function');
    });
  });
});