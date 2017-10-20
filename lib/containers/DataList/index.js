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

var DataListActions = _interopRequireWildcard(_actions);

var _ListHeader = require('../../components/ListHeader');

var _ListHeader2 = _interopRequireDefault(_ListHeader);

var _ListFooter = require('../../components/ListFooter');

var _ListFooter2 = _interopRequireDefault(_ListFooter);

var _ListRow = require('../../components/ListRow');

var _ListRow2 = _interopRequireDefault(_ListRow);

var _Pagination = require('../../components/Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataList = function (_Component) {
  _inherits(DataList, _Component);

  // eslint-disable-line react/prefer-stateless-function
  function DataList(props) {
    _classCallCheck(this, DataList);

    // this.state = {
    //   // preferencedProps: this.mergePropsAndPreferences(props.selectedView, props.preferences)
    //   preferencedProps: props.selectedView.props
    // };

    var _this = _possibleConstructorReturn(this, (DataList.__proto__ || Object.getPrototypeOf(DataList)).call(this, props));

    _this.makeLoading = _this.makeLoading.bind(_this);
    _this.makeContentPlaceholderLoading = _this.makeContentPlaceholderLoading.bind(_this);
    return _this;
  }

  _createClass(DataList, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextprops) {
      /** This enables a default view props visibility to be set by user preferences, 
       * but it will be overriden when the UPDATE_VIEW_PROPS in the app reducer runs 
       * signifying the user overrode initial preferences.
       * */
      // if(nextprops.overridePropsPrefs){
      // this.setState({
      //     preferencedProps: nextprops.selectedView.props
      //   });
      // }
    }
  }, {
    key: 'makeDataList',
    value: function makeDataList(Items, selectedView) {
      return Items.map(function (item, i) {
        return _react2.default.createElement(
          _ListRow2.default,
          { key: i, item: item, selectedView: selectedView },
          ' '
        );
      });
    }
  }, {
    key: 'makeNoResults',
    value: function makeNoResults(noResultsMessage) {
      var message = noResultsMessage ? noResultsMessage : "No Results Found...";

      return _react2.default.createElement(
        'li',
        { className: 'dl__dataList--noResults' },
        _react2.default.createElement(
          'h1',
          null,
          message
        )
      );
    }
  }, {
    key: 'makeLoading',
    value: function makeLoading() {
      return _react2.default.createElement(
        'li',
        { className: 'dl__dataList--loading' },
        _react2.default.createElement(
          'h1',
          null,
          'Loading...'
        ),
        _react2.default.createElement(
          'div',
          null,
          ' '
        )
      );
    }
  }, {
    key: 'makeContentPlaceholderLoading',
    value: function makeContentPlaceholderLoading(Placeholder, total) {
      var placeholders = [];

      for (var i = 0; i < total; i++) {
        placeholders.push(_react2.default.createElement(Placeholder, { key: Math.random() * 1000 + i }));
      }

      return placeholders;
    }

    /** 
    * Reduce preferences to only the selected view for the "props" key.
    * Run that over the config props to see if we need to make any changes.
    * Return the adjusted config props for use in rendering.
    * @todo see how this plays with dynamically changed props...
    */
    // mergePropsAndPreferences(selectedView, preferences) {
    //   const propsPreferences = preferences
    //     .filter(pref =>
    //       pref.view === selectedView.id && pref.data.props
    //     ).reduce((acc, curr) =>
    //       acc.concat(curr.data.props)
    //     , []);

    //   return selectedView.props
    //     .map(prop => {
    //       const propPref = propsPreferences
    //         .filter(pref => {
    //           return pref.key === prop.key;
    //         });

    //       return propPref ? { ...prop, ...propPref[0] } : prop
    //     });
    // }

  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          config = _props.config,
          selectedView = _props.selectedView,
          _props$Items = _props.Items,
          Items = _props$Items === undefined ? [] : _props$Items,
          showLoading = _props.showLoading,
          width = _props.width,
          preferences = _props.preferences;

      var listItems = showLoading ? selectedView.customContentPlaceholder ? this.makeContentPlaceholderLoading(selectedView.customContentPlaceholder, selectedView.customContentPlaceholderAmount) : this.makeLoading() : Items && Items.length > 0 ? this.makeDataList(Items, selectedView) : this.makeNoResults(selectedView.noResultsMessage),
          classNames = config.pinPagination ? 'dl__dataList dl__pinPagination' : 'dl__dataList',
          listHeader = selectedView.showListHeader ? _react2.default.createElement(
        _ListHeader2.default,
        { selectedView: selectedView, item: Items[0] },
        ' '
      ) : '',
          pagination = Items && Items.length > 0 ? _react2.default.createElement(
        _Pagination2.default,
        { bottom: config.dataList.paginationBottomPosition },
        ' '
      ) : '';

      return _react2.default.createElement(
        'div',
        { className: classNames, style: { height: config.dataList.height, width: width } },
        listHeader,
        _react2.default.createElement(
          'div',
          { className: 'dl__dataListWrapper', style: { overflowY: config.dataList.overflowY } },
          _react2.default.createElement(
            'ul',
            { className: 'dl__dataList-list' },
            listItems
          )
        ),
        pagination,
        _react2.default.createElement(
          _ListFooter2.default,
          null,
          ' '
        )
      );
    }
  }]);

  return DataList;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
  return {
    config: state.app.config,
    selectedView: state.app.selectedView,
    force: state.app.force,
    dataList: state.dataList,
    showLoading: state.app.showLoading,
    preferences: state.app.preferences,
    overridePropsPrefs: state.app.overridePreferences.props
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(DataListActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DataList);