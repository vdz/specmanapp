import { apiDo } from '../helpers/api.js';

export const GET_PROJECTS           = 'get projects';
export const GOT_PROJECTS           = 'got projects';
export const CREATE_PROJECT         = 'create project';
export const PROJECT_CREATED        = 'project created';

export function getProjects() {
    return (dispatch) => {
        dispatch({
            type:  GET_PROJECTS
        });

        apiDo({
            method : 'get',
            url : '/projects'
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error('Augh, there was an error!', err.statusText);
        });
    }
}

export function createProject(params) {
    return (dispatch) => {
        dispatch({
            type : CREATE_PROJECT,
            project : {...params}
        });

        apiDo({
            method : 'post',
            url : '/projects',
            params
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.error('Augh, there was an error!', err.statusText);
        });
    }
}