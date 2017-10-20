'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _actions = require('./actions');

var ListHeaderActions = _interopRequireWildcard(_actions);

var _ColumnSelector = require('../ColumnSelector');

var _ColumnSelector2 = _interopRequireDefault(_ColumnSelector);

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListHeader = function (_Component) {
  _inherits(ListHeader, _Component);

  // eslint-disable-line react/prefer-stateless-function
  function ListHeader(props) {
    _classCallCheck(this, ListHeader);

    var _this = _possibleConstructorReturn(this, (ListHeader.__proto__ || Object.getPrototypeOf(ListHeader)).call(this, props));

    _this.state = {
      showColumnSelector: false,
      showDetachedSort: false,
      sortAsc: {}
    };

    _this.onSettingsClick = _this.onSettingsClick.bind(_this);
    return _this;
  }

  _createClass(ListHeader, [{
    key: 'toggleSort',
    value: function toggleSort(e) {
      var _props = this.props,
          selectedView = _props.selectedView,
          filterChange = _props.filterChange,
          elem = e.currentTarget,
          cls = 'dl__listHeader--sort--desc',
          key = e.currentTarget.getAttribute('data-key');


      if (selectedView.enableListSort) {

        // if(elem.classList.contains(cls)){
        if (this.state.sortAsc[key]) {
          elem.classList.remove(cls);

          filterChange({
            id: 'sort-' + key,
            view: selectedView.id,
            value: 'DESC'
          });

          this.setState({ sortAsc: _defineProperty({}, key, false) });
        } else {
          elem.classList.add(cls);

          filterChange({
            id: 'sort-' + key,
            view: selectedView.id,
            value: 'ASC'
          });

          this.setState({ sortAsc: _defineProperty({}, key, true) });
        }
      }
    }
  }, {
    key: 'onSettingsClick',
    value: function onSettingsClick() {
      this.setState({ showColumnSelector: !this.state.showColumnSelector });
    }
  }, {
    key: 'onChecked',
    value: function onChecked(e) {
      var _props2 = this.props,
          Items = _props2.Items,
          config = _props2.config,
          workspaceItems = _props2.workspaceItems,
          updateWorkspace = _props2.updateWorkspace,
          selectAll = e.target.checked,
          workspaceAction = selectAll ? 'add' : 'remove';


      [].concat(_toConsumableArray(document.querySelectorAll('.dl__listRow'))).forEach(function (row) {
        var check = row.getElementsByTagName('input')[0];

        if (check.type == "checkbox") {
          check.checked = selectAll;
        }
      });

      if (selectAll) {
        Items.forEach(function (item) {
          updateWorkspace({
            Item: config.hooks.onCheck({ item: item, workspaceItems: workspaceItems }),
            workspaceAction: workspaceAction
          });
        });
      } else {
        Items.forEach(function (item) {
          updateWorkspace({
            Item: config.hooks.onUnCheck({ item: item, workspaceItems: workspaceItems }),
            workspaceAction: workspaceAction
          });
        });
      }
    }
  }, {
    key: 'makeDetachedSort',
    value: function makeDetachedSort(props) {
      // props = the sortable items
      return _react2.default.createElement(
        'div',
        { className: 'dl__detachedSort' },
        'detached sort'
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          selectedView = _props3.selectedView,
          config = _props3.config,
          item = _props3.item;

      var props = selectedView.props;
      var settingsIcon = selectedView.showListSettings ? _react2.default.createElement(
        'span',
        { className: 'dl__listHeader-listSettings', onClick: this.onSettingsClick },
        ' '
      ) : '',
          columnSelector = this.state.showColumnSelector ? _react2.default.createElement(
        _ColumnSelector2.default,
        { selectedView: selectedView, currentViewProps: props, item: item },
        ' '
      ) : '',
          check = selectedView.enableRowChecks ? _react2.default.createElement(
        'span',
        { key: -1, style: { width: '33px' }, className: 'dl__listHeader-item' },
        _react2.default.createElement(
          _Checkbox2.default,
          { onChecked: this.onChecked.bind(this), id: 'dl-select-all' },
          ' '
        )
      ) : '',
          classNames = config.pinPagination ? 'dl__pinPagination dl__listHeader' : 'dl__listHeader',
          sortIcon = selectedView.enableListSort && selectedView.detachSort ? _react2.default.createElement(
        'span',
        { className: 'dl__listHeader-listSort', onClick: function onClick() {
            return _this2.setState({ showDetachedSort: !_this2.state.showDetachedSort });
          } },
        ' '
      ) : '',
          detachedSort = this.state.showDetachedSort || selectedView.alwaysShowDetachedSort ? this.makeDetachedSort(props) : '';

      return _react2.default.createElement(
        'div',
        { className: classNames, style: _extends({}, selectedView.listHeaderStyles) },
        check,
        props.map(function (prop) {
          var sortClasses = selectedView.enableListSort && !selectedView.detachSort && prop.isSortable ? _this2.state.sortAsc[prop.key] ? 'dl__listHeader--sort' : 'dl__listHeader--sort dl__listHeader--sort--desc' : _this2.state.sortAsc[prop.key] ? 'dl__listHeader--sort dl__listHeader--sort--disabled' : 'dl__listHeader--sort dl__listHeader--sort--disabled dl__listHeader--sort--desc';

          if (prop.display) {
            return _react2.default.createElement(
              'span',
              { key: Math.random() * 100000, 'data-key': prop.key, style: _extends({}, _extends({}, { width: prop.width }, selectedView.listHeaderItemStyles)), className: 'dl__listHeader-item', onClick: _this2.toggleSort.bind(_this2) },
              prop.label,
              ' ',
              _react2.default.createElement(
                'span',
                { className: sortClasses },
                ' '
              )
            );
          }
        }),
        settingsIcon,
        sortIcon,
        columnSelector,
        detachedSort
      );
    }
  }]);

  return ListHeader;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    force: state.app.force,
    listHeader: state.listHeader,
    Items: state.app.Items,
    workspaceItems: state.app.workspaceItems
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(ListHeaderActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ListHeader);