'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _utils = require('../../utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//@todo find a better place to inject this
//import config from '../../dataListConfig';

var visitor = {};

/**
 * Buffer for the request handler
 * @type {boolean}
 */
var config = {
  defaultView: '',
  views: [{
    id: '',
    paginationTake: 0

  }]
};

var initialState = {
  config: config,
  views: [],
  preferences: [], // {view:'catalog': data: {props:[]} Get's potentially populated in the onInit hook or anywhere else. Keys are dot notation
  overridePreferences: {
    props: false
  },
  selectedView: {}, //Must be an empty object by default
  queryString: '', // the current query string based on filter value
  queryObject: {},
  sortBy: '', // a sortBy Value,
  filters: [], // Contains all applied filters
  pagination: {
    skip: 0,
    take: 100,
    page: 1,
    total: 0
  },
  dataSources: {},
  Items: [],
  workspaceItems: [],
  showLoading: false
};

function appReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var _state = _extends({}, state),
      _data = action.data;

  switch (action.type) {

    case _constants.ON_APP_INIT:

      /**
       * NOTE: INIT sets up the state object.
       * It gets called multiple times from multiple places in order to
       * build the state objects data conditionally
       */
      if (_data.hasOwnProperty('config')) {
        config = _data.config;
        _state.config = _data.config;

        if (config.hasOwnProperty('googleAnalyticsUAId') && config.googleAnalyticsUAId) {}
        // visitor = ua(config.googleAnalyticsUAId);


        // Set pagination options
        _state.pagination = {
          skip: 0,
          take: config.views.filter(function (view) {
            var viewQueryParam = _utils.queries.getViewParamFromURL(); // Get the view from the url or from the set default if not defined
            return viewQueryParam ? view.id === viewQueryParam : view.id === config.defaultView || true; // falls back to any view in case the default wasn't set
          })[0].paginationTake,
          page: 1,
          total: 0
        };

        //Set the selected view
        _state.selectedView = _extends({}, _data.config.views.filter(function (view) {
          var viewQueryParam = _utils.queries.getViewParamFromURL(); // Get the view from the url or from the set default if not defined
          return viewQueryParam ? view.id === viewQueryParam : view.id === _data.config.defaultView || true; // falls back to any view in case the default wasn't set
        })[0], { addons: [] });

        _state.views = _data.config.views;
      }

      if (_data.hasOwnProperty('pagination')) {
        _data.pagination.take = _state.selectedView.paginationTake;
        _state.pagination = _data.pagination;
      }

      // Get the initial query string and object
      if (_data.hasOwnProperty('queryString')) {
        _state.queryString = _data.queryString;
      } else if (_data.hasOwnProperty('queryObject')) {
        _state.queryObject = _data.queryObject;
      }

      _state.showLoading = true;
      _state.Items = [];

      /**
      * Allow injection of preferences for use throughout the app
      */
      if (_data.hasOwnProperty('preferences')) {
        _state.preferences = _data.preferences;
        _state = applyPreferences(_state);
      }

      // HOOK @todo should allow returning new state from hook
      if (_state.config && _state.config.hooks && _state.config.hooks.onStateUpdate) {
        _state.config.hooks.onStateUpdate(_state);
      }

      return _state;

    case _constants.UPDATE_CURRENT_TAB:
      _utils.queries.clearURLQueryString();

      _state.selectedView = _state.views.filter(function (view) {
        return view.id === _data;
      })[0];
      _state.selectedView.addons = [];
      _state.views = makeViews(_state, { view: _data, id: '*', value: null });
      _state.queryString = null;
      _state.queryObject = {};
      _state.force = Math.random() * 10000000;
      _state = _extends({}, _state, makeQuery(_state, _state.selectedView.addons));
      _state.showLoading = true;
      _state.pagination = {
        skip: 0,
        take: _state.selectedView.paginationTake,
        page: 1,
        total: 0
      };
      _state.Items = [];

      // Clear sorting
      //@todo make sort readable in url. Right now sort get resets on load and is not linkable. Not enough time to program it.
      [].concat(_toConsumableArray(document.getElementsByClassName('dl__listHeader--sort'))).forEach(function (node) {
        node.classList.remove('dl__listHeader--sort--desc');
      });

      runFilters(_state, _state.selectedView);

      /**
      * Allow for a synchronous fetch of preferences. Does not support async at this stage
      */
      if (_state.config.hooks.onGetPreferences) {
        _state.preferences = _state.config.hooks.onGetPreferences();
        _state = applyPreferences(_state);
      }

      _state.config.hooks.onStateUpdate(_state);

      return _state;

    case _constants.UPDATE_ITEMS:
      _state.Items = _data.Items;
      _state.pagination.total = _data.count;
      _state.force = Math.random() * 10000000;
      _state.showLoading = false;
      _state.config.hooks.onStateUpdate(_state);
      return _state;

    case _constants.UPDATE_VIEW_PROPS:

      // 1. find the prop in our current view props
      // 2. set the prop.display to the checked val true/false
      // 3. force a render down the tree
      _state.selectedView.props = _state.selectedView.props.map(function (prop) {
        if (prop.key === _data.prop) {
          prop.display = _data.checked;
        }

        return prop;
      });

      /**
       * Important for forcing a rerender when mutating nested state. Redux won't see nested changes.
       * Make sure to include force in the mapStateToProps in the component to force the rerender
       * @type {number}
       */
      _state.force = Math.random() * 10000000;
      _state.config.hooks.onStateUpdate(_state);

      // Run the on Update hook
      if (_state.config.hooks.onViewPropChange) {
        _state.config.hooks.onViewPropChange({
          prop: _data.prop,
          checked: _data.checked,
          viewId: _data.viewId,
          selectedView: _state.selectedView
        });
      }

      console.log('ON view prop change', _state.selectedView.props, _data);

      // Override preferences because the user indicated they wanted to change the default/preferenced set of visible props
      // _state.overridePreferences.props = true;

      return _state;

    case _constants.FILTER_CHANGE:
      var isBatchUpdate = _underscore2.default.isArray(_data);

      // Only clear on fresh filter runs, not paginated filter runs
      // Compare the pagination and filters in the current state with the incoming request to determine 
      // if this should be flagged as a fresh filter run. If fresh, reset pagination
      var isFirstPageLoad = false;
      var currentSetFilters = _state.selectedView.filterGroups.reduce(function (sum, filterGroup) {
        if (!!filterGroup.filters) {
          return sum.concat(filterGroup.filters.filter(function (fltr) {
            return fltr.value !== null ? fltr.id : false;
          }).map(function (fltr) {
            return fltr.id;
          }));
        }
      }, []);

      var currentFilterId = isBatchUpdate ? _data.reduce(function (sum, filter) {
        return sum.concat(filter.id);
      }, []) : [_data.id];

      var isNewFilterRun = currentSetFilters.length !== currentFilterId.length;

      var firstTime = localStorage.getItem("first_load");
      if (!firstTime) {
        localStorage.setItem("first_load", "1");
        isFirstPageLoad = true;
      }

      if (!isFirstPageLoad && isNewFilterRun) {
        _state.pagination = {
          skip: 0,
          take: _state.selectedView.paginationTake || 100,
          page: 1,
          total: 0
        };

        _state.selectedView.clearPaginationQueryString = true; // Fresh request. No need for pagination to linger
      }

      /**
       * Batch updating is possible to minimize rerenders down the tree
       * Used by the runQueryStringURLOnRender initialization in App/index.js
       */
      if (isBatchUpdate) {

        _data.forEach(function (filterChange) {
          //[{id,view,value}]
          _state.views = makeViews(_state, filterChange);

          // Add the search filter as a filter addon
          if (filterChange.id === 'search' || filterChange.id.indexOf('sort-') > -1) {
            _state.selectedView.addons = _utils.collections.replaceItem(_state.selectedView.addons, filterChange, 'id');
          }
        });
      } else {
        //id,view,value
        _state.views = makeViews(_state, _data);

        // Add the search filter as a filter addon
        if (_data.id === 'search' || _data.id.indexOf('sort-') > -1) {
          _state.selectedView.addons = _utils.collections.replaceItem(_state.selectedView.addons, _data, 'id');
        }
      }

      _state.queryObject = {};
      _state.Items = [];

      _state = _extends({}, _state, makeQuery(_state, _state.selectedView.addons));
      runFilters(_state, _state.selectedView);

      _state.showLoading = true;
      _state.force = Math.random() * 10000000;
      _state.config.hooks.onStateUpdate(_state);

      return _state;

    case _constants.RESET_FILTERS:

      _state.views = makeViews(_state, { view: '*', id: '*', value: null });
      _state.queryString = null;
      _state.queryObject = {};
      _state.showLoading = true;
      _state.Items = [];
      _state.force = Math.random() * 10000000;
      //@todo need to run through items in addons and set their values to null

      //Clear the search addon value
      _state.selectedView.addons = _state.selectedView.addons.map(function (addon) {
        return addon.id == 'search' ? _extends({}, addon, { value: null }) : addon;
      });

      // Clear sorting
      //@todo make sort readable in url. Right now sort get resets on load and is not linkable. Not enough time to program it.
      [].concat(_toConsumableArray(document.getElementsByClassName('dl__listHeader--sort'))).forEach(function (node) {
        node.classList.remove('dl__listHeader--sort--desc');
      });

      runFilters(_state, _state.selectedView);
      _state.config.hooks.onStateUpdate(_state);

      return _state;

    case _constants.UPDATE_SEARCH_INPUT:

      _state.selectedView.addons = _utils.collections.replaceItem(_state.selectedView.addons, _data, 'id');
      _state = _extends({}, _state, makeQuery(_state, [_data])); //update the queryObject and queryString

      _state.forceSearch = Math.random() * 10000000;
      _state.config.hooks.onStateUpdate(_state);

      return _state;

    case _constants.UPDATE_PAGINATION:
      _state.pagination = _data.pagination;
      _state.config.hooks.onStateUpdate(_state);

      return _state;

    case _constants.UPDATE_WORKSPACE:
      switch (_data.workspaceAction) {
        case 'add':
        case 'update':
          _state.workspaceItems = _utils.collections.replaceItem(_state.workspaceItems, _data.Item, _state.selectedView.itemIdProp);
          break;
        case 'remove':
          _state.workspaceItems = _utils.collections.removeItem(_state.workspaceItems, _data.Item, _state.selectedView.itemIdProp);
          break;
      }
      _state.config.hooks.onStateUpdate(_state);

      return _state;

    default:
      return _state;
  }
}

exports.default = appReducer;

/**
 * Interceptor for adding props to the state object
 */

function makeQuery(_state) {
  var addons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var pseudoFilters = [].concat(_toConsumableArray(addons), [{
    id: 'view',
    value: _state.selectedView.id,
    view: _state.selectedView.id
  }]);
  // Create a new array of all the filters from the current view, excluding null or undefined values
  var filters = _underscore2.default.chain(_state.selectedView.filterGroups.map(function (group) {
    return group.filters;
  })).flatten().map(function (filter) {
    return typeof filter.value !== 'undefined' || filter.range && (filter.range.start !== null || filter.range.end !== null) ? filter : false;
  }).compact().value();

  var queryObject = _extends({}, _state.queryObject, _utils.queries.makeQueryObject(filters.concat(pseudoFilters)));

  return {
    queryObject: _underscore2.default.omit(queryObject, function (v, k) {
      return v === null;
    }), // Clean it after we've updated the query string
    queryString: _utils.queries.makeQueryString(queryObject)
  };
}

/**
 * Hook for running common actions after state modification and before return
 * This is where filters xhr requests get called from when something changes
 * @param _state
 * @param options
 */
function runFilters(_state, options) {
  _utils.queries.writeQueryStringToURL(_state.queryString, options);
  _utils.filters.run(_state, options); // The response calls a render method that handles where we render to utils/filter._render
}

/**
 * Displays the filters' loading icon
 */
function showLoadingIcon() {
  $('#filterSort__loading').addClass('filterSort__loading--show');

  setTimeout(function () {
    hideLoadingIcon();
  }, 1000);
}

/**
 * Hides the filters' loading icon
 */
function hideLoadingIcon() {
  $('#filterSort__loading').removeClass('filterSort__loading--show');
}

/**
 * Creates & returns a new views array after altering the view & view's filter
 * @param _state
 * @param filterChange
 * @returns {Array}
 */
function makeViews(_state, filterChange) {
  return [].concat(_toConsumableArray(_state.views.map(function (view) {
    // Handle passed in view ids as an array.
    var filterChangeViewId = Array.isArray(filterChange.view) ? filterChange.view[0] : filterChange.view;

    if (view.id === filterChangeViewId || filterChangeViewId === '*') {
      view.filterGroups.forEach(function (filterGroup) {
        filterGroup.filters.forEach(function (filter) {
          if (filter.type === 'range') {
            var id = filterChange.id.split('--');

            if (filter.id === id[0]) {
              filter.range[id[1]] = filterChange.value;
            }

            if (filterChange.id === '*') {
              filter.range.start = filterChange.value;
              filter.range.end = filterChange.value;
            }
          } else {
            if (filter.id === filterChange.id || filterChange.id === '*') {
              filter.value = filterChange.value;
            }
          }
        });
      });
    }

    return view;
  })));
}

/**
 * Apply any preferences being passed in. Called at the end of the INIT action. Must return state
 */
function applyPreferences(state) {

  /**
   * Apply the props preferences being passed in for rendering view props
   */
  state.selectedView.props = mergePropsAndPreferences(state.selectedView, state.preferences);
  return state;
}

/** 
* Reduce preferences to only the selected view for the "props" key.
* Run that over the config props to see if we need to make any changes.
* Return the adjusted config props for use in rendering.
* @todo see how this plays with dynamically changed props...
*/
function mergePropsAndPreferences(selectedView) {
  var preferences = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var propsPreferences = preferences ? preferences.filter(function (pref) {
    return pref && pref.view === selectedView.id && pref.data.props;
  }).reduce(function (acc, curr) {
    return acc.concat(curr.data.props);
  }, []) : [];

  return selectedView.props.map(function (prop) {
    var propPref = propsPreferences.filter(function (pref) {
      return pref.key === prop.key;
    });

    return propPref ? _extends({}, prop, propPref[0]) : prop;
  });
}