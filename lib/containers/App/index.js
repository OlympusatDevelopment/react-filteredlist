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

var AppActions = _interopRequireWildcard(_actions);

var _utils = require('../../utils');

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Filters = require('../Filters');

var _Filters2 = _interopRequireDefault(_Filters);

var _DataList = require('../DataList');

var _DataList2 = _interopRequireDefault(_DataList);

var _Footer = require('../Footer');

var _Footer2 = _interopRequireDefault(_Footer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Remove the first load marker,..
// first_load gets used in the app reducer
window.onbeforeunload = function (e) {
  localStorage.removeItem("first_load", "1");
};

var App = function (_Component) {
  _inherits(App, _Component);

  // eslint-disable-line react/prefer-stateless-function
  function App(props) {
    _classCallCheck(this, App);

    // Kickoff first data load
    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.init(props);

    // Setup the render listener for dipatching items to the store after xhr requests
    _this._initRenderer();

    _this.state = {
      toggleFilter: false
    };
    return _this;
  }

  /**
   * Init actions
   * props is a main app reducer
   * @param props
   */


  _createClass(App, [{
    key: 'init',
    value: function init(props) {
      var updatePagination = props.updatePagination,
          config = props.config,
          dataListConfig = props.dataListConfig,
          filterChange = props.filterChange,
          appInit = props.appInit,
          app = props.app,
          self = this,
          paginationParams = _underscore2.default.pick(_utils.queries.parseParms(_utils.queries.readQueryStringFromURL()), ['skip', 'take', 'page']),
          nonPaginationParams = Object.keys(_underscore2.default.omit(_utils.queries.parseParms(_utils.queries.readQueryStringFromURL()), ['skip', 'take', 'page', ""]));

      appInit({ config: dataListConfig });

      /**
       * Check the hooks for onInit
       */
      if (dataListConfig.hooks && dataListConfig.hooks.onInit) {

        /**
         * One last config check. Set the config as soon as we get it but allow a 
         * preferences object to be passed in.
         */
        var onInit = dataListConfig.hooks.onInit(app, dataListConfig);

        /**
         * do a fn exists check. If a return fn wasn't passed then onInit wil be 
         * undefined and we can move on, otherwise let's pass along the preferences here.
         */
        if (onInit) {
          onInit(function () {
            var preferences = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            appInit({ preferences: preferences });
            _initNext();
          });
        } else {
          _initNext();
        }
      } else {
        _initNext();
      }

      // Encapuslated to allow async nexting
      function _initNext() {

        // Cast the incoming values to int
        var pagination = {
          skip: (paginationParams.skip || 0) * 1,
          take: (paginationParams.take || app.pagination.take) * 1,
          page: (paginationParams.page || 1) * 1,
          id: 'dl__items__' + dataListConfig.id
        };

        appInit({
          pagination: pagination
        }); // Set the initial pagination from query string read

        // Add the pagination listener
        self._initPaginationChangeListener();

        /** 
        * If the config option was set to allow run of query string on render & if there is a string in the url
        * Filter out pagination params & the view param from our filter query string detection
        */
        //if((dataListConfig.runQueryStringURLOnRender && nonPaginationParams.length > 0)) {
        self._applyQueryStringToFilters({ props: props, self: self, pagination: pagination });
        // }else{
        // @todo This is wiping out the pagination data on load
        // filterChange([]);//triggers an empty load to load the default dataset. No filters were in url or the config prevents running filter queries
        // }
      }
    }

    /**
     * Procedure used to Convert the query string to filter values
     */

  }, {
    key: '_applyQueryStringToFilters',
    value: function _applyQueryStringToFilters(args) {
      return this._readQueryString(args).then(this._makeQueryObjectFromQueryString).then(this._populateFilterArrays);
    }

    /**
     * Read the query string in the address bar
     */

  }, {
    key: '_readQueryString',
    value: function _readQueryString(args) {
      return new _bluebird2.default(function (resolve, reject) {
        resolve(_extends({}, args, { queryString: _utils.queries.readQueryStringFromURL() }));
      });
    }

    /**
     * Convert the query string to a query object
     * @param args
     * @private
     */

  }, {
    key: '_makeQueryObjectFromQueryString',
    value: function _makeQueryObjectFromQueryString(args) {
      return new _bluebird2.default(function (resolve, reject) {
        resolve(_extends({}, args, { queryObject: _utils.queries.makeQueryObjectFromQueryString(args.queryString) }));
      });
    }

    /**
     * Dispatches to create a new filter for each value present in the query Object
     * @param args
     * @private
     */

  }, {
    key: '_populateFilterArrays',
    value: function _populateFilterArrays(args) {
      var self = this;

      return new _bluebird2.default(function (resolve, reject) {
        var filterChangeBatch = [];

        var nonPaginationParams = _underscore2.default.omit(args.queryObject, ['skip', 'take', 'page', ""]),
            viewId = _underscore2.default.pick(nonPaginationParams, 'view').view;

        delete nonPaginationParams.view; // Internal use only, no more need to have it included

        _underscore2.default.mapObject(nonPaginationParams, function (value, key) {
          // Took this out to support csv values in query params vals. Our use case was the networks multiselect filter.
          // if (_.isArray(value)) 
          // value.forEach(val => {
          //   filterChangeBatch.push({
          //     id: key,
          //     view: viewId,
          //     value: val
          //   });
          // });
          // } else 
          if (_underscore2.default.isObject(value) && key === 'sort') {
            args.self._sortDispatcher(_extends(args, { sort: value }));
          } else {
            // Handle the sort object
            filterChangeBatch.push({
              id: key,
              view: viewId,
              value: value
            });
          }
        });

        args.props.filterChange(filterChangeBatch);
        args.props.appInit({
          pagination: args.pagination,
          queryObject: args.queryObject,
          queryString: args.queryString
        });
        resolve(_extends({}, args));
      });
    }

    /**
     * Handles dynamically dispatching to the store by building objects based on our config file
     * @param args
     * @param key
     * @param value
     * @private
     */

  }, {
    key: '_filterDispatchBuilder',
    value: function _filterDispatchBuilder(args, key, value, viewId) {
      var self = this;
      var filterDispatch = {};

      // Loop through the views, filter groups & child filters until we find our id.
      //Dispatch the filter as a normal change
      self.props.app.views.forEach(function (view) {
        if (viewId === view.id) {
          view.filterGroups.forEach(function (group) {
            group.filters.forEach(function (filter) {

              // Dispatch only when we have found our filter by value.
              // Special handling of constant for date filters
              if (filter.id === key) {
                filterDispatch = {
                  id: key,
                  view: viewId,
                  value: value
                };
              }
            });
          });
        }
      });

      return filterDispatch;
    }

    /**
     * Does a mapping of the id to the particular default.
     * Runs when a url is producing the filter configuration
     * @param def
     * @param entityUUID
     * @param dataSources
     * @private
     */

  }, {
    key: '_lookupLabelByID',
    value: function _lookupLabelByID(def, entityUUID, dataSources) {
      var entity = _underscore2.default.findWhere(dataSources[def], { entityUUID: entityUUID });
      return typeof entity === 'undefined' ? def : entity.entityValue;
    }

    /**
     * Dispatches for sort items
     * @param args
     * @private
     */

  }, {
    key: '_sortDispatcher',
    value: function _sortDispatcher(args) {}
    //_.mapObject(args.sort,(value,key)=>{
    //
    //    // Run through the sort items
    //    args.props.options.sort.by.forEach(sortItem=>{
    //
    //        // Dispatch only when we have found our filter by value.
    //        // SPecial handling of constant for date filters
    //        if(sortItem.id === key){
    //
    //            // Action CONSTANT is created by filter ui type ie. select,date,checkbox,link
    //            let CONSTANT = `SORT_CHANGE`;
    //
    //            // Dispatch an action
    //            args.props.setFilter({
    //                type:CONSTANT,
    //                data:{
    //                    id:sortItem.id,
    //                    label:sortItem.label,//get the value of the selected item
    //                    instanceType : 'sort',
    //                    value
    //                }
    //            });
    //        }
    //    });
    //});


    /**
     * Handle listening for pagination events
     * @private
     */

  }, {
    key: '_initPaginationChangeListener',
    value: function _initPaginationChangeListener() {
      var _props = this.props,
          app = _props.app,
          config = _props.config,
          dataListConfig = _props.dataListConfig,
          appInit = _props.appInit,
          self = this;


      return new _bluebird2.default(function (resolve, reject) {
        var elem = document;

        elem.addEventListener('paginationChange', function (e) {
          var event = e.data;

          // Only run if we are filtering dataTable items & there are items in the queryObject
          if (event.id === 'dl__items__' + dataListConfig.id) {

            // Need to update the store here
            self.loadNextPage(event).then(function (res) {
              // Update the redux store to keep everything in sync
              appInit({ pagination: e.data });

              /**
               * The pagination component update is set by the
               * xhr request response in utils.js makeXHRRequest func
               */
            });
          }
        });
      });
    }

    /**
     * Listen for filter xhr list item data to be returned from the app
     * @private
     */

  }, {
    key: '_initRenderer',
    value: function _initRenderer() {
      var updateItems = this.props.updateItems;

      var elem = document;

      elem.addEventListener('renderToStore', function (e) {
        updateItems({
          Items: e.data.Items,
          count: e.data.total
        });
      });
    }

    /**
     * Send a request to run the filters passing the new pagination params but the same queryObject taken from the state tree
     */

  }, {
    key: 'loadNextPage',
    value: function loadNextPage(event) {
      var _this2 = this;

      return new _bluebird2.default(function (resolve, reject) {
        var app = _this2.props.app;

        // Triggers the xhr Request

        _utils.filters.run(_extends({}, app, { pagination: event }), app.selectedView).then(resolve, reject);
      });
    }
  }, {
    key: 'makeAppBody',
    value: function makeAppBody(app) {
      var _this3 = this;

      var filters = this.props.config.showFilters ? _react2.default.createElement(_Filters2.default, { className: this.state.toggleFilter ? 'dl__filters--open' : '' }) : '',
          width = this.props.config.showFilters ? undefined : '100%',
          filtersToggle = this.props.config.showFilters ? _react2.default.createElement('div', { className: 'dl__filters--toggle', onClick: function onClick() {
          return _this3.setState({ toggleFilter: !_this3.state.toggleFilter });
        } }) : '';

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Header2.default,
          null,
          ' '
        ),
        _react2.default.createElement(
          'div',
          { className: 'dl__container' },
          filtersToggle,
          filters,
          _react2.default.createElement(
            _DataList2.default,
            { Items: app.Items, width: width },
            ' '
          )
        ),
        _react2.default.createElement(
          _Footer2.default,
          null,
          ' '
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          selector = _props2.config.selector,
          app = _props2.app,
          classNames = 'dl ' + selector,
          appBody = Object.keys(app.selectedView).length > 0 ? this.makeAppBody(app) : ''; //Delay render until config is loaded

      return _react2.default.createElement(
        'div',
        { className: classNames },
        appBody
      );
    }
  }]);

  return App;
}(_react.Component);

//Which part of the Redux global state does our component want to receive as props?


function mapStateToProps(state, ownProps) {
  //console.log('STATE in App/index.js',state,ownProps);
  return {
    config: state.app.config,
    app: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(AppActions, dispatch);
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);