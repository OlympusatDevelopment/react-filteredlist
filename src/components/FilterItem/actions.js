import {FILTER_CHANGE} from './constants';

export function filterChange(data) {
  return {
    type: FILTER_CHANGE,
    data
  };
}