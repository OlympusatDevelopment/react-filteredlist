'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * ColumnSelectorConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
var DEFAULT_LOCALE = exports.DEFAULT_LOCALE = 'en';
var UPDATE_VIEW_PROPS = exports.UPDATE_VIEW_PROPS = 'dl/UPDATE_VIEW_PROPS';