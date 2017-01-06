import {
    GOT_PROJECTS,
    PROJECT_CREATED,
    PROJECT_UPDATED,
    PROJECT_DELETED,
    RESET_PROJECTS,
    GOT_SECTIONS,
    SECTION_CREATED,
    SECTION_UPDATED,
    SECTION_DELETED,
    RESET_SECTIONS,
    GOT_LOCATIONS,
    LOCATION_CREATED,
    LOCATION_UPDATED,
    LOCATION_DELETED,
    RESET_LOCATIONS

} from  '../actions/data.actions.js';

export const default_state = {
    projects : {},
    sections : {},
    types : {},
    locations : {},
    specs : {}
};

export function reducer(state = default_state, action) {
    switch (action.type) {
        case GOT_PROJECTS: return {
            ...state,
            projects : action.data
        }
        case PROJECT_CREATED : return {
            ...state,
            projects : {
                ...state.data,
                [action.data.id] : action.data
            }
        }
        case PROJECT_UPDATED : return {
            ...state,
            projects : {
                ...state.projects,
                [action.data.id] : action.data
            }
        }
        case PROJECT_DELETED : {
            let new_projects = {...state.projects};
            delete new_projects[action.id];

            return {
                ...state,
                projects : new_projects
            }
        }
        case RESET_PROJECTS : return {
            ...state,
            projects : {...default_state.projects}
        }


        case GOT_SECTIONS: return {
            ...state,
            sections : action.data
        }
        case SECTION_CREATED : return {
            ...state,
            sections : {
                ...state.sections,
                [action.data.id] : action.data
            }
        }
        case SECTION_UPDATED : return {
            ...state,
            sections : {
                ...state.sections,
                [action.data.id] : action.data
            }
        }
        case SECTION_DELETED : {
            let new_items = {...state.sections};
            delete new_items[action.id];

            return {
                ...state,
                sections : new_items
            }
        }
        case RESET_SECTIONS : return {
            ...state,
            sections : {...default_state.sections}
        }

        case GOT_LOCATIONS: return {
            ...state,
            locations : action.data
        }
        case LOCATION_CREATED : return {
            ...state,
            locations : {
                ...state.locations,
                [action.data.id] : action.data
            }
        }
        case LOCATION_UPDATED : return {
            ...state,
            locations : {
                ...state.locations,
                [action.data.id] : action.data
            }
        }
        case LOCATION_DELETED : {
            let new_items = {...state.sections};
            delete new_items[action.id];

            return {
                ...state,
                locations : new_items
            }
        }
        case RESET_LOCATIONS : return {
            ...state,
            locations : {...default_state.locations}
        }
    }

    return state;
}