'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var SearchActions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_Component) {
  _inherits(Search, _Component);

  // eslint-disable-line react/prefer-stateless-function
  function Search(props) {
    _classCallCheck(this, Search);

    return _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));
  }

  _createClass(Search, [{
    key: 'onSearchSubmit',
    value: function onSearchSubmit(e) {
      e.preventDefault();
      var _props = this.props,
          options = _props.options,
          filterChange = _props.filterChange,
          input = document.getElementById('dl-search--' + options.id);


      filterChange({
        id: 'search',
        view: options.id,
        value: input.value
      });
    }
  }, {
    key: 'onSearchClear',
    value: function onSearchClear(e) {
      e.preventDefault();

      this.props.filterChange({
        id: 'search',
        view: this.props.options.id,
        value: null
      });
    }
  }, {
    key: 'bindSearch',
    value: function bindSearch(e) {
      var _props2 = this.props,
          options = _props2.options,
          filterChange = _props2.filterChange,
          updateSearch = _props2.updateSearch,
          input = document.getElementById('dl-search--' + options.id);


      updateSearch({
        id: 'search',
        view: options.id,
        value: input.value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          options = _props3.options,
          config = _props3.config,
          search = _props3.search,
          addons = _props3.addons; //options are the current view options

      var a = addons.map(function (addon) {
        return addon.id === 'search' ? addon : false;
      })[0];
      var val = a ? decodeURIComponent(a.value) : '';
      var searchVal = val == 'null' || val == null ? '' : val;
      var searchButton = options.searchButton || {};

      return _react2.default.createElement(
        'div',
        { className: 'dl__search' },
        _react2.default.createElement(
          'form',
          { onSubmit: this.onSearchSubmit.bind(this) },
          _react2.default.createElement('input', { id: 'dl-search--' + options.id, className: 'dl__searchInput', autoFocus: true, type: 'text', name: 'dl-search', placeholder: 'Search', value: searchVal, onChange: this.bindSearch.bind(this) }),
          _react2.default.createElement(
            'span',
            { className: 'dl__searchClearButton', onClick: this.onSearchClear.bind(this) },
            ' '
          ),
          _react2.default.createElement('input', { type: 'submit', value: 'Search', style: { background: searchButton.background, color: searchButton.text } })
        )
      );
    }
  }]);

  return Search;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    search: state.search,
    forceSearch: state.app.forceSearch,
    force: state.app.force,
    addons: state.app.selectedView.addons
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(SearchActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Search);