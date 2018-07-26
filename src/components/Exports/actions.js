import {
  CONTROL_MODAL
} from './constants';

export function controlModal(data) {
    return {
        type: CONTROL_MODAL,
        data
    };
}
