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
export const RESET_PROJECTS         = 'reset projects';

export const GET_SECTIONS           = 'get sections';
export const GOT_SECTIONS           = 'got sections';
export const CREATE_SECTION         = 'create section';
export const SECTION_CREATED        = 'section created';
export const UPDATE_SECTION         = 'update section';
export const SECTION_UPDATED        = 'section updated';
export const DELETE_SECTION         = 'delete section';
export const SECTION_DELETED        = 'section deleted';
export const RESET_SECTIONS         = 'reset sections';

export const GET_LOCATIONS          = 'get locations';
export const GOT_LOCATIONS          = 'got locations';
export const CREATE_LOCATION        = 'create location';
export const LOCATION_CREATED       = 'location created';
export const UPDATE_LOCATION        = 'update location';
export const LOCATION_UPDATED       = 'location updated';
export const DELETE_LOCATION        = 'delete location';
export const LOCATION_DELETED       = 'location deleted';
export const RESET_LOCATIONS        = 'reset locations';

export const GET_TYPES              = 'get types';
export const GOT_TYPES              = 'got types';
export const RESET_TYPES            = 'reset types';



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
                data : arrayToHash(data)
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
                data
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
                data
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

export function resetProjects() {
    return {
        type : RESET_PROJECTS
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
                data : arrayToHash(data)
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
                data
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
                data
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

export function resetSections() {
    return {
        type : RESET_SECTIONS
    }
}


export function getLocations(project_id) {
    const type = 'locations';

    return (dispatch) => {
        dispatch({
            type:  GET_LOCATIONS
        });

        const url = project_id
            ? `/${type}?project_id=${project_id}`
            : '/${type}';

        apiDo({
            method : 'get',
            url
        }).then((res) => {
            console.log('getLocations', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type : GOT_LOCATIONS,
                data : arrayToHash(data)
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function createLocation(params) {
    const type = 'locations';

    return (dispatch, getState) => {
        dispatch({
            type : CREATE_LOCATION,
            location : {...params}
        });

        const curr_project_id = getState().current.project.id;

        apiDo({
            method : 'post',
            url : `/${type}`,
            params
        }).then((res) => {
            console.log('createLocation', res);

            if (!res) return;
            let data = JSON.parse(res);

            if (curr_project_id != data.project_id) return;

            dispatch({
                type : LOCATION_CREATED,
                data
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function updateLocation(params) {
    const type = 'locations';

    return (dispatch) => {
        dispatch({
            type : UPDATE_LOCATION,
            update : {...params}
        });

        let payload = {...params};
        delete payload.id;

        apiDo({
            method : 'put',
            url : `/${type}/${params.id}`,
            params
        }).then((res) => {
            console.log('updateSection', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type : LOCATION_UPDATED,
                data
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function deleteLocation(id) {
    const type = 'locations';

    return (dispatch) => {
        dispatch({
            type : DELETE_LOCATION,
            id
        });

        apiDo({
            method : 'delete',
            url : `/${type}/${id}`
        }).then((res) => {
            console.log('deleteLocation', res);

            dispatch({
                type : LOCATION_DELETED,
                id
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }

}

export function resetLocations() {
    return {
        type : RESET_LOCATIONS
    }
}


export function getTypes(section_id) {
    const type = 'types';

    return (dispatch) => {
        dispatch({
            type:  GET_TYPES
        });

        const url = section_id
            ? `/${type}?section_id=${section_id}`
            : '/${type}';

        apiDo({
            method : 'get',
            url
        }).then((res) => {
            console.log('getTypes', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type : GOT_TYPES,
                data : arrayToHash(data)
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function createType(params) {
    const type = 'types';

    return (dispatch, getState) => {
        dispatch({
            type : CREATE_TYPE,
            location : {...params}
        });

        const curr_section_id = getState().current.section.id;

        apiDo({
            method : 'post',
            url : `/${type}`,
            params
        }).then((res) => {
            console.log('createTypes', res);

            if (!res) return;
            let data = JSON.parse(res);

            if (curr_section_id != data.section_id) return;

            dispatch({
                type : TYPE_CREATED,
                data
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function updateType(params) {
    const type = 'types';

    return (dispatch) => {
        dispatch({
            type : UPDATE_TYPE,
            update : {...params}
        });

        let payload = {...params};
        delete payload.id;
        
        apiDo({
            method : 'put',
            url : `/${type}/${params.id}`,
            params
        }).then((res) => {
            console.log('updateType', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type : TYPE_UPDATED,
                data
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function deleteType(id) {
    const type = 'types';

    return (dispatch) => {
        dispatch({
            type : DELETE_TYPE,
            id
        });

        apiDo({
            method : 'delete',
            url : `/${type}/${id}`
        }).then((res) => {
            console.log('deleteType', res);

            dispatch({
                type : TYPE_DELETED,
                id
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }

}

export function resetTypes() {
    return {
        type : RESET_TYPES
    }
}