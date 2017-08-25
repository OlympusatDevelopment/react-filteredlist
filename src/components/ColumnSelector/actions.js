import {UPDATE_VIEW_PROPS} from './constants';

/**
 * Load the repositories, this action starts the request saga
 */
export function updateViewProps(data) {
  return {
    type: UPDATE_VIEW_PROPS,
    data
  };
}