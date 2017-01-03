import { apiDo } from '../helpers/api.js';
import { arrayToHash } from '../helpers/utils.js';

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
            console.log('getProjects', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type : GOT_PROJECTS,
                projects : arrayToHash(data)
            });
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
            console.log('createProject', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type : PROJECT_CREATED,
                project : data
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err.statusText);
        });
    }
}