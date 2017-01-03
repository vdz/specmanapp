import { GOT_PROJECTS } from  '../actions/data.actions.js';

export const default_state = {
    data : {
        projects : {},
        sections : {},
        types : {},
        locations : {},
        specs : {}
    }
};

export function reducer(state = default_state, action) {
    switch (action.type) {
        case GOT_PROJECTS: return {
            ...state,
            projects : action.projects
        }
    }

    return state;
}