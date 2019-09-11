import {FILTER_CHANGE,UPDATE_SEARCH_INPUT, CONTROL_MODAL} from './constants';

export function filterChange(data) {
    return {
        type: FILTER_CHANGE,
        data
    };
}

export function updateSearch(data) {
    return {
        type: UPDATE_SEARCH_INPUT,
        data
    };
}

export function controlModal(data) {
    return {
        type: CONTROL_MODAL,
        data
    };
}