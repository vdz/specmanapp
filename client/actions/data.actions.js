import {apiDo} from '../helpers/api.js';
import {arrayToHash} from '../helpers/utils.js';
import { getMediaService } from '../helpers/cloudinary.js';

export const GET_PROJECTS = 'get projects';
export const GOT_PROJECTS = 'got projects';
export const CREATE_PROJECT = 'create project';
export const PROJECT_CREATED = 'project created';
export const UPDATE_PROJECT = 'update project';
export const PROJECT_UPDATED = 'project updated';
export const DELETE_PROJECT = 'delete project';
export const PROJECT_DELETED = 'project deleted';
export const RESET_PROJECTS = 'reset projects';

export const GET_SECTIONS = 'get sections';
export const GOT_SECTIONS = 'got sections';
export const CREATE_SECTION = 'create section';
export const SECTION_CREATED = 'section created';
export const UPDATE_SECTION = 'update section';
export const SECTION_UPDATED = 'section updated';
export const DELETE_SECTION = 'delete section';
export const SECTION_DELETED = 'section deleted';
export const RESET_SECTIONS = 'reset sections';

export const GET_LOCATIONS = 'get locations';
export const GOT_LOCATIONS = 'got locations';
export const CREATE_LOCATION = 'create location';
export const LOCATION_CREATED = 'location created';
export const UPDATE_LOCATION = 'update location';
export const LOCATION_UPDATED = 'location updated';
export const DELETE_LOCATION = 'delete location';
export const LOCATION_DELETED = 'location deleted';
export const RESET_LOCATIONS = 'reset locations';

export const GET_TYPES = 'get types';
export const GOT_TYPES = 'got types';
export const CREATE_TYPE = 'create type';
export const TYPE_CREATED = 'type created';
export const UPDATE_TYPE = 'update type';
export const TYPE_UPDATED = 'type updated';
export const DELETE_TYPE = 'delete type';
export const TYPE_DELETED = 'type deleted';
export const RESET_TYPES = 'reset types';

export const GET_SPECS = 'get specs';
export const GOT_SPECS = 'got specs';
export const CREATE_SPEC = 'create spec';
export const SPEC_CREATED = 'spec created';
export const UPDATE_SPEC = 'update spec';
export const SPEC_UPDATED = 'spec updated';
export const DELETE_SPEC = 'delete spec';
export const SPEC_DELETED = 'spec deleted';
export const RESET_SPECS = 'reset specs';

export const DELETE_DOC = 'delete doc';
export const DOC_DELETED = 'doc deleted';

export const DELETE_FIELD = 'delete field';
export const FIELD_DELETED = 'field deleted';


export function getGlobalData() {
    return (dispatch) => {
        dispatch(getProjects());
        dispatch(getSections());
        dispatch(getLocations());
    }
}


export function getProjects() {
    return (dispatch) => {
        dispatch({
            type: GET_PROJECTS
        });

        apiDo({
            method: 'get',
            url: '/projects'
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: GOT_PROJECTS,
                data: arrayToHash(data)
            });
        }).catch((err) => {
            console.error('getProjects error!', err);
        });
    }
}

export function createProject(params) {
    return (dispatch) => {
        dispatch({
            type: CREATE_PROJECT,
            project: {...params}
        });

        apiDo({
            method: 'post',
            url: '/projects',
            params
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: PROJECT_CREATED,
                data
            });
        }).catch((err) => {
            console.error('createProject error!', err.statusText);
        });
    }
}

export function updateProject(params) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_PROJECT,
            update: {...params}
        });

        apiDo({
            method: 'put',
            url: `/projects/${params.id}`,
            params
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: PROJECT_UPDATED,
                data
            });
        }).catch((err) => {
            console.error('updateProject error!', err.statusText);
        });
    }
}

export function deleteProject(id) {
    return (dispatch) => {
        dispatch({
            type: DELETE_PROJECT,
            id
        });

        apiDo({
            method: 'delete',
            url: `/projects/${id}`
        }).then((res) => {
            console.log('deleteProject', res);

            dispatch({
                type: PROJECT_DELETED,
                id
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err.statusText);
        });
    }

}

export function resetProjects() {
    return {
        type: RESET_PROJECTS
    }
}


export function getSections() {
    return (dispatch) => {
        dispatch({
            type: GET_SECTIONS
        });

        apiDo({
            method: 'get',
            url: '/sections'
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: GOT_SECTIONS,
                data: arrayToHash(data, 'types')
            });
        }).catch((err) => {
            console.error('getSections error!', err);
        });
    }
}

export function createSection(params) {
    return (dispatch) => {
        dispatch({
            type: CREATE_SECTION,
            section: {...params}
        });

        apiDo({
            method: 'post',
            url: '/sections',
            params
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            data.types = arrayToHash(data.types);

            dispatch({
                type: SECTION_CREATED,
                data
            });
        }).catch((err) => {
            console.error('createSection error!', err);
        });
    }
}

export function updateSection(params) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SECTION,
            update: {...params}
        });

        apiDo({
            method: 'put',
            url: `/sections/${params.id}`,
            params
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            data.types = arrayToHash(data.types);

            dispatch({
                type: SECTION_UPDATED,
                data
            });
        }).catch((err) => {
            console.error('updateSection error!', err);
        });
    }
}

export function deleteSection(id) {
    return (dispatch) => {
        dispatch({
            type: DELETE_SECTION,
            id
        });

        apiDo({
            method: 'delete',
            url: `/sections/${id}`
        }).then((res) => {
            dispatch({
                type: SECTION_DELETED,
                id
            });
        }).catch((err) => {
            console.error('deleteSection error!', err);
        });
    }

}

export function resetSections() {
    return {
        type: RESET_SECTIONS
    }
}


export function getLocations() {
    return (dispatch) => {
        dispatch({
            type: GET_LOCATIONS
        });

        apiDo({
            method: 'get',
            url : '/locations'
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: GOT_LOCATIONS,
                data: arrayToHash(data)
            });
        }).catch((err) => {
            console.error('getLocations error!', err);
        });
    }
}

export function createLocation(params) {
    return (dispatch, getState) => {
        dispatch({
            type: CREATE_LOCATION,
            location: {...params}
        });

        apiDo({
            method: 'post',
            url: `/locations`,
            params
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: LOCATION_CREATED,
                data
            });
        }).catch((err) => {
            console.error('createLocation error!', err);
        });
    }
}

export function updateLocation(params) {
    const type = 'locations';

    return (dispatch) => {
        dispatch({
            type: UPDATE_LOCATION,
            update: {...params}
        });

        let payload = {...params};
        delete payload.id;

        apiDo({
            method: 'put',
            url: `/${type}/${params.id}`,
            params
        }).then((res) => {
            console.log('updateSection', res);

            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: LOCATION_UPDATED,
                data
            });
        }).catch((err) => {
            console.error('Augh, there was an error!', err);
        });
    }
}

export function deleteLocation(id) {
    return (dispatch) => {
        dispatch({
            type: DELETE_LOCATION,
            id
        });

        apiDo({
            method: 'delete',
            url: `/locations/${id}`
        }).then((res) => {
            dispatch({
                type: LOCATION_DELETED,
                id
            });
        }).catch((err) => {
            console.error('deleteLocation error!', err);
        });
    }

}

export function resetLocations() {
    return {
        type: RESET_LOCATIONS
    }
}


export function getTypes(section_id) {
    return (dispatch) => {
        dispatch({
            type: GET_TYPES,
            section_id
        });

        if (!section_id) return;

        const url = section_id
            ? `/types?section_id=${section_id}`
            : '/types';

        apiDo({
            method: 'get',
            url
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: GOT_TYPES,
                data: arrayToHash(data),
                section_id
            });
        }).catch((err) => {
            console.error('getTypes error!', err);
        });
    }
}

export function createType(params) {
    return (dispatch) => {
        dispatch({
            type: CREATE_TYPE,
            type: {...params}
        });

        apiDo({
            method: 'post',
            url: '/types',
            params
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: TYPE_CREATED,
                data
            });
        }).catch((err) => {
            console.error('createTypes error!', err);
        });
    }
}

export function updateType(params) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_TYPE,
            update: {...params}
        });

        apiDo({
            method: 'put',
            url: `/types/${params.id}`,
            params
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: TYPE_UPDATED,
                data
            });
        }).catch((err) => {
            console.error('updateType error!', err);
        });
    }
}

export function deleteType(item) {
    return (dispatch) => {
        dispatch({
            type: DELETE_TYPE,
            id : item.id
        });

        apiDo({
            method: 'delete',
            url: `/types/${item.id}`
        }).then((res) => {
            dispatch({
                type: TYPE_DELETED,
                item
            });
        }).catch((err) => {
            console.error('deleteType error!', err);
        });
    }

}

export function resetTypes(section_id) {
    return {
        type: RESET_TYPES,
        section_id
    }
}


export function getSpecs(project_id) {
    return (dispatch) => {
        dispatch({
            type: GET_SPECS
        });

        const url = project_id
            ? `/specs?project_id=${project_id}`
            : '/specs';

        apiDo({
            method: 'get',
            url
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: GOT_SPECS,
                data: arrayToHash(data)
            });
        }).catch((err) => {
            console.error('getSpecs error!', err);
        });
    }
}

export function createSpec(params) {
    return (dispatch) => {
        dispatch({
            type: CREATE_SPEC,
            spec: {...params}
        });

        apiDo({
            method: 'post',
            url: '/specs',
            params
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: SPEC_CREATED,
                data
            });
        }).catch((err) => {
            console.error('createSpec error!', err);
        });
    }
}

export function updateSpec(params) {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SPEC,
            update: {...params}
        });

        apiDo({
            method: 'put',
            url: `/specs/${params.id}`,
            params
        }).then((res) => {
            if (!res) return;
            let data = JSON.parse(res);

            dispatch({
                type: SPEC_UPDATED,
                data
            });
        }).catch((err) => {
            console.error('updateSpec error!', err);
        });
    }
}

export function deleteSpec(id) {
    return (dispatch) => {
        dispatch({
            type: DELETE_SPEC,
            id
        });

        apiDo({
            method: 'delete',
            url: `/specs/${id}`
        }).then((res) => {
            dispatch({
                type: SPEC_DELETED,
                id
            });
        }).catch((err) => {
            console.error('deleteSpec, there was an error!', err);
        });
    }

}

export function resetSpecs() {
    return {
        type: RESET_SPECS
    }
}


export function deleteDoc(item) {
    return (dispatch) => {
        dispatch({
            type: DELETE_DOC,
            id : item.id
        });

        getMediaService().uploader.destroy(item.remote_id, (r)=>console.log('cloudinary delete',r));

        apiDo({
            method: 'delete',
            url: `/docs/${item.id}`
        }).then((res) => {
            dispatch({
                type: DOC_DELETED,
                item
            });
        }).catch((err) => {
            console.error('deleteDoc, there was an error!', err);
        });
    }
}
export function deleteField(item) {
    return (dispatch) => {
        dispatch({
            type: DELETE_FIELD,
            id : item.id
        });

        apiDo({
            method: 'delete',
            url: `/fields/${item.id}`
        }).then((res) => {
            dispatch({
                type: FIELD_DELETED,
                item
            });
        }).catch((err) => {
            console.error('deleteField, there was an error!', err);
        });
    }
}