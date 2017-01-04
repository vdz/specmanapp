import { getSections } from './data.actions.js';

export const SET_CURRENT_PROJECT            = 'set current project';

export function setProject(project = {}) {
    return (dispatch) => {
        dispatch({
            type: SET_CURRENT_PROJECT,
            project
        });

        dispatch(getSections(project.id));
    }
}