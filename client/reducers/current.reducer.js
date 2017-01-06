import {
    SET_CURRENT_PROJECT,
    SET_CURRENT_SECTION,
    SET_CURRENT_LOCATION
} from  '../actions/current.actions.js';

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
            ...default_state,
            project : action.item
        }

        case SET_CURRENT_SECTION: return {
            ...state,
            section : action.item,
            type : {...default_state.type}
        }

        case SET_CURRENT_LOCATION: return {
            ...state,
            location : action.item
        }
    }

    return state;
}