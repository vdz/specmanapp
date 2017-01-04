import { apiDo } from '../helpers/api.js';
import { arrayToHash } from '../helpers/utils.js';

export const GET_PROJECTS           = 'get projects';
export const GOT_PROJECTS           = 'got projects';
export const CREATE_PROJECT         = 'create project';
export const PROJECT_CREATED        = 'project created';
export const UPDATE_PROJECT         = 'update project';
export const PROJECT_UPDATED        = 'project updated';
export const DELETE_PROJECT         = 'delete project';
export const PROJECT_DELETED        = 'project deleted';

export const GET_SECTIONS           = 'get sections';
export const GOT_SECTIONS           = 'got sections';
export const CREATE_SECTION         = 'create section';
export const SECTION_CREATED        = 'section created';
export const UPDATE_SECTION         = 'update section';
export const SECTION_UPDATED        = 'section updated';
export const DELETE_SECTION         = 'delete section';
export const SECTION_DELETED        = 'section deleted';



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

export function updateProject(params) {
    return (dispatch) => {
        dispatch({
            type : UPDATE_PROJECT,
            update : {...params}
        });

        let payload = {...params};
        delete payload.id;

        apiDo({
            method : 'put',
            url : `/projects/${params.id}`,
            params
        }).then((res) => {
            console.log('updateProject', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type : PROJECT_UPDATED,
                project : data
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err.statusText);
        });
    }
}

export function deleteProject(id) {
    return (dispatch) => {
        dispatch({
            type : DELETE_PROJECT,
            id
        });

        apiDo({
            method : 'delete',
            url : `/projects/${id}`
        }).then((res) => {
            console.log('deleteProject', res);

            dispatch({
                type : PROJECT_DELETED,
                id
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err.statusText);
        });
    }
    
}

export function getSections(project_id) {
    return (dispatch) => {
        dispatch({
            type:  GET_SECTIONS
        });

        const url = project_id
            ? `/sections?project_id=${project_id}`
            : '/sections';

        apiDo({
            method : 'get',
            url
        }).then((res) => {
            console.log('getSections', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type : GOT_SECTIONS,
                sections : arrayToHash(data)
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function createSection(params) {
    return (dispatch, getState) => {
        dispatch({
            type : CREATE_SECTION,
            project : {...params}
        });

        const curr_project_id = getState().current.project.id;

        apiDo({
            method : 'post',
            url : '/sections',
            params
        }).then((res) => {
            console.log('createSection', res);

            if (!res) return;
            let data = JSON.parse(res);

            if (curr_project_id != data.project_id) return;

            dispatch({
                type : SECTION_CREATED,
                section : data
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function updateSection(params) {
    return (dispatch) => {
        dispatch({
            type : UPDATE_SECTION,
            update : {...params}
        });

        let payload = {...params};
        delete payload.id;

        apiDo({
            method : 'put',
            url : `/sections/${params.id}`,
            params
        }).then((res) => {
            console.log('updateSection', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type : SECTION_UPDATED,
                section : data
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function deleteSection(id) {
    return (dispatch) => {
        dispatch({
            type : DELETE_SECTION,
            id
        });

        apiDo({
            method : 'delete',
            url : `/sections/${id}`
        }).then((res) => {
            console.log('deleteSection', res);

            dispatch({
                type : SECTION_DELETED,
                id
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }

}