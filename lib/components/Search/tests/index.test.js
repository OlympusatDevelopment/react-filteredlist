'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('<Search />', function () {
  it('should render its children', function () {
    var children = _react2.default.createElement(
      'h1',
      null,
      'Test'
    );
    var renderedComponent = (0, _enzyme.shallow)(_react2.default.createElement(
      _index2.default,
      null,
      children
    ));
    expect(renderedComponent.contains(children)).toBe(true);
  });
});