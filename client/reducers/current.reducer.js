import { SET_CURRENT_PROJECT } from  '../actions/current.actions.js';

export const default_state = {
    project : {},
    spec : {},
    section : {},
    type : {},
    location : {}
};

export function reducer(state = default_state, action) {
    switch (action.type) {
        case SET_CURRENT_PROJECT: return {
            ...state,
            project : action.project
        }
    }

    return state;
}