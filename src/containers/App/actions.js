import {
    UPDATE_ITEMS,
    ON_APP_INIT,
    FILTER_CHANGE,
    RESET_FILTERS,
    UPDATE_PAGINATION
} from './constants';

export function updateItems(data) {
    return {
        type: UPDATE_ITEMS,
        data
    };
}

export function appInit(data) {
    return {
        type: ON_APP_INIT,
        data
    };
}

export function updatePagination(data) {
    return {
        type: UPDATE_PAGINATION,
        data
    };
}

export function filterChange(data) {
    return {
        type: FILTER_CHANGE,
        data
    };
}