import {
    getTypes,
    getSpecs,
    resetSpecs
} from './data.actions.js';

export const SET_CURRENT_PROJECT            = 'set current project';
export const SET_CURRENT_SECTION            = 'set current section';
export const SET_CURRENT_LOCATION           = 'set current location';
export const SET_CURRENT_TYPE               = 'set current type';
export const SET_CURRENT_SPEC               = 'set current spec';

export function setProject(item = {}) {
    return (dispatch) => {
        dispatch({
            type: SET_CURRENT_PROJECT,
            item
        });

        if (Object.keys(item).length) {
            dispatch(getSpecs(item.id));
        } else {
            dispatch(resetSpecs());
        }
    }
}

export function setSection(item = {}) {
    return (dispatch) => {
        dispatch({
            type : SET_CURRENT_SECTION,
            item
        });

        dispatch(getTypes(item.id));
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

export function setSpec(item = {}) {
    return (dispatch) => dispatch({
        type : SET_CURRENT_SPEC,
        item
    })
}