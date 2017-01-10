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
    RESET_LOCATIONS,
    
    GOT_TYPES,
    TYPE_CREATED,
    TYPE_UPDATED,
    TYPE_DELETED,
    RESET_TYPES,

    GOT_SPECS,
    SPEC_CREATED,
    SPEC_UPDATED,
    SPEC_DELETED,
    RESET_SPECS,

} from  '../actions/data.actions.js';

export const default_state = {
    projects : {},
    sections : {},
    locations : {},
    specs : {}
};

export function reducer(state = default_state, action) {
    switch (action.type) {
        case GOT_PROJECTS: return {
            ...state,
            projects : action.data
        }
        case PROJECT_CREATED :
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
        case SECTION_CREATED :
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
        case LOCATION_CREATED : 
        case LOCATION_UPDATED : return {
            ...state,
            locations : {
                ...state.locations,
                [action.data.id] : action.data
            }
        }
        case LOCATION_DELETED : {
            let new_items = {...state.locations};
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

        case GOT_TYPES: {
            let updated_section = {
                ...state.sections[action.section_id],
                types : action.data
            };

            return {
                ...state,
                sections : {
                    ...state.sections,
                    [action.section_id] : updated_section
                }
            }
        }
        case TYPE_CREATED :
        case TYPE_UPDATED : {
            let updated_section = {
                ...state.sections[action.data.section_id],
                types : {
                    ...state.sections[action.data.section_id].types,
                    [action.data.id] : action.data
                }
            };

            return {
                ...state,
                sections : {
                    ...state.sections,
                    [action.data.section_id] : updated_section
                }
            }
        }
        case TYPE_DELETED : {
            let updated_section = {
                ...state.sections[action.item.section_id]
            };
            delete updated_section.types[action.item.id];

            return {
                ...state,
                sections : updated_section
            }
        }
        case RESET_TYPES : return {
            ...state,
            sections : {
                ...state.sections,
                [action.section_id] : {
                    ...state.sections[action.section_id],
                    types : {...default_state.types}
                }
            }
        }

        case GOT_SPECS: return {
            ...state,
            specs : action.data
        }
        case SPEC_CREATED :
        case SPEC_UPDATED : return {
            ...state,
            specs : {
                ...state.specs,
                [action.data.id] : action.data
            }
        }
        case SPEC_DELETED : {
            let new_items = {...state.specs};
            delete new_items[action.id];

            return {
                ...state,
                specs : new_items
            }
        }
        case RESET_SPECS : return {
            ...state,
            specs : {...default_state.specs}
        }

    }

    return state;
}