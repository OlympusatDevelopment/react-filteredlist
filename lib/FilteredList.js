'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _appComponent = require('./app--component');

var _appComponent2 = _interopRequireDefault(_appComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var pjson = require('../package.json');

console.log('react-filteredlist | version ' + pjson.version);

var FilteredList = function (_React$Component) {
	_inherits(FilteredList, _React$Component);

	function FilteredList() {
		_classCallCheck(this, FilteredList);

		return _possibleConstructorReturn(this, (FilteredList.__proto__ || Object.getPrototypeOf(FilteredList)).apply(this, arguments));
	}

	_createClass(FilteredList, [{
		key: 'render',
		value: function render() {
			return React.createElement(_appComponent2.default, { config: this.props.config });
		}
	}]);

	return FilteredList;
}(React.Component);

exports.default = FilteredList;