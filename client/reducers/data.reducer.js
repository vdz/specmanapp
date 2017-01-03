import {
    GOT_PROJECTS,
    PROJECT_CREATED
} from  '../actions/data.actions.js';

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

        case PROJECT_CREATED : return {
            ...state,
            projects : {
                ...state.projects,
                [action.project.id] : action.project
            }
        }
    }

    return state;
}