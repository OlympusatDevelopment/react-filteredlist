import {FILTER_CHANGE,UPDATE_SEARCH_INPUT} from './constants';

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