'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
var DEFAULT_LOCALE = exports.DEFAULT_LOCALE = 'en';
var UPDATE_CURRENT_TAB = exports.UPDATE_CURRENT_TAB = 'dl/UPDATE_CURRENT_TAB';
var UPDATE_VIEW_PROPS = exports.UPDATE_VIEW_PROPS = 'dl/UPDATE_VIEW_PROPS';
var FILTER_CHANGE = exports.FILTER_CHANGE = 'dl/FILTER_CHANGE';
var UPDATE_ITEMS = exports.UPDATE_ITEMS = 'dl/UPDATE_ITEMS';
var ON_APP_INIT = exports.ON_APP_INIT = 'dl/ON_APP_INIT';
var RESET_FILTERS = exports.RESET_FILTERS = 'dl/RESET_FILTERS';
var UPDATE_SEARCH_INPUT = exports.UPDATE_SEARCH_INPUT = 'dl/UPDATE_SEARCH_INPUT';
var UPDATE_PAGINATION = exports.UPDATE_PAGINATION = 'dl/UPDATE_PAGINATION';
var UPDATE_WORKSPACE = exports.UPDATE_WORKSPACE = 'dl/UPDATE_WORKSPACE';