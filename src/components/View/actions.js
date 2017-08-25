import {RESET_FILTERS} from './constants';


export function resetFilters(data) {
    return {
        type: RESET_FILTERS,
        data
    };
}