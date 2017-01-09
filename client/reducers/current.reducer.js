import {
    SET_CURRENT_PROJECT,
    SET_CURRENT_SECTION,
    SET_CURRENT_LOCATION,
    SET_CURRENT_TYPE
} from  '../actions/current.actions.js';

import {
    SECTION_UPDATED,
    SECTION_DELETED,
    GOT_TYPES,
    TYPE_CREATED,
    TYPE_UPDATED,
    TYPE_DELETED,
} from  '../actions/data.actions.js';

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

        case SET_CURRENT_TYPE: return {
            ...state,
            type : action.item
        }

        case SECTION_UPDATED : {
            if (action.data.id == state.section.id) {
                return {
                    ...state,
                    section : action.data
                }
            }
        }

        case SECTION_DELETED : {
            if (action.item.id == state.section.id) {
                return {
                    ...state,
                    section : {...default_state.section}
                }
            }
        }

        case GOT_TYPES : {
            if (action.section_id == state.section.id) {
                return {
                    ...state,
                    section : {
                        ...state.section,
                        types : action.data
                    }
                }
            }
        }

        case TYPE_CREATED :
        case TYPE_UPDATED : {
            if (action.data.section_id == state.section.id) {
                return {
                    ...state,
                    section : {
                        ...state.section,
                        types : {
                            ...state.section.types,
                            [action.data.id] : action.data
                        }
                    }
                }
            }
        }

        case TYPE_DELETED : {
            if (action.item.section_id == state.section.id) {
                let new_types = {...state.section.types}
                delete new_types[action.item.id];
                return {
                    ...state,
                    section : {
                        ...state.section,
                        types : new_types
                    }
                }
            }
        }
    }

    return state;
}