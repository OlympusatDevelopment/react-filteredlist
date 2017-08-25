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
export const DEFAULT_LOCALE = 'en';
export const UPDATE_CURRENT_TAB = 'dl/UPDATE_CURRENT_TAB';
export const UPDATE_VIEW_PROPS = 'dl/UPDATE_VIEW_PROPS';
export const FILTER_CHANGE = 'dl/FILTER_CHANGE';
export const UPDATE_ITEMS = 'dl/UPDATE_ITEMS';
export const ON_APP_INIT = 'dl/ON_APP_INIT';
export const RESET_FILTERS = 'dl/RESET_FILTERS';
export const UPDATE_SEARCH_INPUT = 'dl/UPDATE_SEARCH_INPUT';
export const UPDATE_PAGINATION = 'dl/UPDATE_PAGINATION';
export const UPDATE_WORKSPACE = 'dl/UPDATE_WORKSPACE';
