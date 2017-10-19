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

var CustomItemActions = _interopRequireWildcard(_actions);

var _Checkbox = require('../Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomItem = function (_Component) {
  _inherits(CustomItem, _Component);

  function CustomItem(props) {
    _classCallCheck(this, CustomItem);

    var _this = _possibleConstructorReturn(this, (CustomItem.__proto__ || Object.getPrototypeOf(CustomItem)).call(this, props));

    _this.state = {
      imgIsOpen: false,
      currentImage: 0
    };
    return _this;
  }

  _createClass(CustomItem, [{
    key: 'onChecked',
    value: function onChecked(e) {
      var _props = this.props,
          updateWorkspace = _props.updateWorkspace,
          item = _props.item,
          config = _props.config,
          workspaceItems = _props.workspaceItems,
          state = e.target.checked,
          workspaceAction = state ? 'add' : 'remove';


      if (state) {
        updateWorkspace({
          Item: config.hooks.onCheck({ item: item, workspaceItems: workspaceItems }),
          workspaceAction: workspaceAction
        });
      } else {
        updateWorkspace({
          Item: config.hooks.onUnCheck({ item: item, workspaceItems: workspaceItems }),
          workspaceAction: workspaceAction
        });
      }
    }
  }, {
    key: 'onLinkClick',
    value: function onLinkClick(e) {
      // Prevent linking when the copy icon is clicked
      if (e.target.classList.contains('dl__featuredImg')) {
        e.preventDefault();
      }
    }
  }, {
    key: 'makeCustomItem',
    value: function makeCustomItem(item, selectedView, CustomDisplayItem, props, parentProps, preferencedProps) {
      var check = selectedView.enableRowChecks ? _react2.default.createElement(
        'span',
        { style: { width: '33px' }, className: 'dl__customItemCheck' },
        _react2.default.createElement(
          _Checkbox2.default,
          { onChecked: this.onChecked.bind(this), id: item[selectedView.itemIdProp] },
          ' '
        )
      ) : '';

      return _react2.default.createElement(
        'div',
        { className: 'dl__customItemInner' },
        check,
        _react2.default.createElement(CustomDisplayItem, { preferencedProps: preferencedProps, item: item, selectedView: selectedView, parentProps: parentProps })
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          item = _props2.item,
          selectedView = _props2.selectedView,
          CustomDisplayItem = _props2.CustomDisplayItem,
          parentProps = _props2.parentProps,
          preferencedProps = _props2.preferencedProps;

      var props = selectedView.props,
          customItem = this.makeCustomItem(item, selectedView, CustomDisplayItem, props, parentProps, preferencedProps);

      return _react2.default.createElement(
        'div',
        { className: 'dl__customItem' },
        customItem
      );
    }
  }]);

  return CustomItem;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    workspaceItems: state.app.workspaceItems,
    force: state.app.force
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(CustomItemActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CustomItem);