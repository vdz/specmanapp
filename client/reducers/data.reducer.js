import {
    GOT_PROJECTS,
    PROJECT_CREATED,
    PROJECT_UPDATED,
    PROJECT_DELETED,
    GOT_SECTIONS,
    SECTION_CREATED,
    SECTION_UPDATED,
    SECTION_DELETED
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
            projects : action.projects
        }

        case PROJECT_CREATED : return {
            ...state,
            projects : {
                ...state.projects,
                [action.project.id] : action.project
            }
        }

        case PROJECT_UPDATED : return {
            ...state,
            projects : {
                ...state.projects,
                [action.project.id] : action.project
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

        case GOT_SECTIONS: return {
            ...state,
            sections : action.sections
        }

        case SECTION_CREATED : return {
            ...state,
            sections : {
                ...state.sections,
                [action.section.id] : action.section
            }
        }

        case SECTION_UPDATED : return {
            ...state,
            sections : {
                ...state.sections,
                [action.section.id] : action.section
            }
        }

        case SECTION_DELETED : {
            let new_sections = {...state.sections};
            delete new_sections[action.id];

            return {
                ...state,
                sections : new_sections
            }
        }
    }

    return state;
}