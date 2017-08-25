import {UPDATE_WORKSPACE,FILTER_CHANGE} from './constants';

export function updateWorkspace(data) {
    return {
        type: UPDATE_WORKSPACE,
        data
    };
}


export function filterChange(data) {
    return {
        type: FILTER_CHANGE,
        data
    };
}