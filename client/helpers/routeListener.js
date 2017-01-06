import { push, replace } from 'react-router-redux';
import { getRoute, buildRoute } from '../config/routes.js';
import UrlPattern from 'url-pattern';

import { getProjects } from '../actions/data.actions.js';
import {
    setProject,
    setSection,
} from '../actions/current.actions.js';

let store;
let current_pathname = '';

export function connect(s) {
    store = s;
}

export function routerListener(location) {
    if (current_pathname == location.pathname) return;

    current_pathname = location.pathname;
    // url handlers
    handleBase(location)
    handleProject(location);
    handleSection(location);
}

// URL Handlers
function handleBase(location) {
    const pattern = new UrlPattern(getRoute('base'));
    const params = pattern.match(location.pathname);

    if (params) {
        store.dispatch(setProject({}));

        let projects = store.getState().data.projects;
        if (!Object.keys(projects).length) {
            store.dispatch(getProjects());
        }
        return true;
    }

    return false;
}

// URL Handlers
function handleProject(location) {
    const pattern = new UrlPattern(getRoute('project'));
    const params = pattern.match(location.pathname);
    
    if (params) {
        getProjectData(params, (obj) => store.dispatch(setProject(obj)));
        return true;
    }

    return false;
}

// URL Handlers
function handleSection(location) {
    const pattern = new UrlPattern(getRoute('section'));
    const params = pattern.match(location.pathname);

    if (params) {
        getProjectData(params, (obj) => store.dispatch(setProject(obj)));
        getSectionData(params, (obj) => store.dispatch(setSection(obj)))
        return true;
    }

    return false;
}

function getProjectData(params, payload) {
    let project = store.getState().current.project;
    let projects = store.getState().data.projects;
    let project_id = params.id * 1;

    if (!project || project.id != project_id) {
        if (!Object.keys(projects).length) {
            // TODO: REFACTOR!!!
            let unsub = store.subscribe(() => subForProjects(project_id, payload, unsub));
        } else {
            project = projects[project_id];
            payload(project);
        }
    }

}

function getSectionData(params, payload) {
    let section = store.getState().current.section;
    let sections = store.getState().data.sections;
    let section_id = params.sectionId * 1;

    if (!section || section.id != section_id) {
        if (!Object.keys(sections).length) {
            // TODO: REFACTOR!!!
            let unsub = store.subscribe(() => subForSections(section_id, payload, unsub));
        } else {
            section = sections[section_id];
            payload(section);
        }
    }
}

function subForProjects(id, payload, unsub) {
    const items = store.getState().data.projects;
    if (Object.keys(items).length > 0) {
        unsub();
        const item = store.getState().data.projects[id];
        payload(item);
    }
}

function subForSections(id, payload, unsub) {
    const items = store.getState().data.sections;
    if (Object.keys(items).length > 0) {
        unsub();
        const item = store.getState().data.sections[id];
        payload(item);
    }
}