import {UPDATE_WORKSPACE} from './constants';

export function updateWorkspace(data) {
  return {
    type: UPDATE_WORKSPACE,
    data
  };
}