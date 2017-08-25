import {UPDATE_CURRENT_TAB} from './constants';

/**
 * Load the repositories, this action starts the request saga
 */
export function updateCurrentTab(data) {
  return {
    type: UPDATE_CURRENT_TAB,
    data
  };
}