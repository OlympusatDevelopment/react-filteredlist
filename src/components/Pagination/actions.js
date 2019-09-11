import {UPDATE_PAGINATION} from './constants';

export function updatePagination(data) {
    return {
        type: UPDATE_PAGINATION,
        data
    };
}