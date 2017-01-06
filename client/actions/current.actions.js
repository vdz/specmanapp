import {
    getSections,
    getLocations,
    getTypes,
    resetSections,
    resetLocations,
    resetTypes,
} from './data.actions.js';

export const SET_CURRENT_PROJECT            = 'set current project';
export const SET_CURRENT_SECTION            = 'set current section';
export const SET_CURRENT_LOCATION           = 'set current location';
export const SET_CURRENT_TYPE               = 'set current type';

export function setProject(item = {}) {
    return (dispatch) => {
        dispatch({
            type: SET_CURRENT_PROJECT,
            item
        });

        if (Object.keys(item).length) {
            dispatch(getSections(item.id));
            dispatch(getLocations(item.id));
        } else {
            dispatch(resetSections());
            dispatch(resetLocations());
        }
    }
}

export function setSection(item = {}) {
    return (dispatch) => {
        dispatch({
            type : SET_CURRENT_SECTION,
            item
        });

        if (Object.keys(item).length) {
            dispatch(getTypes(item.id));
        } else {
            dispatch(resetTypes());
        }
    }
}

export function setLocation(item = {}) {
    return (dispatch) => dispatch({
        type : SET_CURRENT_LOCATION,
        item
    })
}

export function setType(item = {}) {
    return (dispatch) => dispatch({
        type : SET_CURRENT_TYPE,
        item
    })
}