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

var SaveFiltersetActions = _interopRequireWildcard(_actions);

var _reactSuperSelect = require('react-super-select');

var _reactSuperSelect2 = _interopRequireDefault(_reactSuperSelect);

var _reactIntl = require('react-intl');

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SaveFilterset = function (_Component) {
  _inherits(SaveFilterset, _Component);

  // eslint-disable-line react/prefer-stateless-function
  function SaveFilterset(props) {
    _classCallCheck(this, SaveFilterset);

    var _this = _possibleConstructorReturn(this, (SaveFilterset.__proto__ || Object.getPrototypeOf(SaveFilterset)).call(this, props));

    _this.state = {
      force: 0,
      showDeleteSelect: false,
      selectValue: {
        name: 'Make Your Selection',
        filterset: '' //@todo read the url on load and set this initial state to the currently run query string if it matches one of the user's saved filtersets
      }
    };
    return _this;
  }

  _createClass(SaveFilterset, [{
    key: 'toggleDeleteInterface',
    value: function toggleDeleteInterface() {
      this.setState({ showDeleteSelect: !this.state.showDeleteSelect });
    }
  }, {
    key: 'formSubmit',
    value: function formSubmit(e) {
      e.preventDefault();

      if (this.props.config.hooks.onSaveFilterset) {
        this.props.config.hooks.onSaveFilterset({
          name: e.target.getElementsByClassName("filterset.name")[0].value,
          queryString: window.location.href,
          queryObject: this.props.app.queryObject
        });
      }

      // Refresh the page in order to ensure saved data has propogated the system 
      // and can be included in the options list. react-super-select caches the component 
      // click and doesn't refresh the ajax call to populate options.
      setTimeout(function () {
        window.location.href = window.location.href;
      }, 1000);
    }
  }, {
    key: 'onSavedFiltersChange',
    value: function onSavedFiltersChange(data) {
      if (data) {
        window.location.href = data.filterset;
        this.setState({ selectValue: data });
      }
    }
  }, {
    key: 'onSavedFiltersDelete',
    value: function onSavedFiltersDelete(data) {
      if (data && this.props.config.hooks.onDeleteFilterset) {
        this.props.config.hooks.onDeleteFilterset(data);

        this.setState({ showDeleteSelect: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          selectedView = _props.selectedView,
          config = _props.config,
          self = this,
          showDeleteSelect = this.state.showDeleteSelect ? _react2.default.createElement(_reactSuperSelect2.default, {
        ajaxDataFetch: selectedView.usersSavedFiltersets || { then: function then() {
            return [];
          } },
        optionLabelKey: 'name',
        optionValueKey: 'filterset',
        placeholder: 'Make Your Selection',
        initialValue: self.state.selectValue,
        onChange: self.onSavedFiltersDelete.bind(self),
        onOpenDropdown: function onOpenDropdown() {},
        onCloseDropdown: function onCloseDropdown() {},
        searchable: false
      }) : '';


      return _react2.default.createElement(
        'div',
        { className: 'dl__saveFilterset' },
        _react2.default.createElement(
          'div',
          { className: 'dl__saveFiltersetForm' },
          _react2.default.createElement(
            'form',
            { onSubmit: this.formSubmit.bind(this) },
            _react2.default.createElement(
              'label',
              null,
              _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.inputLabel),
              _react2.default.createElement('input', { type: 'text', className: 'filterset.name', placeholder: _messages2.default.inputPlaceholder.defaultMessage }),
              _react2.default.createElement('input', { type: 'submit', value: _messages2.default.formSubmitValue.defaultMessage })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'dl__saveFiltersetDelete' },
          _react2.default.createElement(
            'span',
            { className: 'dl__saveFiltersetDeleteButton', onClick: this.toggleDeleteInterface.bind(this) },
            _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.deleteFilterset)
          ),
          showDeleteSelect
        ),
        _react2.default.createElement(
          'label',
          null,
          _react2.default.createElement(_reactIntl.FormattedMessage, _messages2.default.selectLabel),
          _react2.default.createElement(_reactSuperSelect2.default, {
            ajaxDataFetch: selectedView.usersSavedFiltersets || { then: function then() {
                return [];
              } },
            optionLabelKey: 'name',
            optionValueKey: 'filterset',
            placeholder: 'Make Your Selection',
            initialValue: self.state.selectValue,
            onChange: self.onSavedFiltersChange.bind(self),
            onOpenDropdown: function onOpenDropdown() {},
            onCloseDropdown: function onCloseDropdown() {},
            searchable: false
          })
        )
      );
    }
  }]);

  return SaveFilterset;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(SaveFiltersetActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SaveFilterset);