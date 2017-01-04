import { push, replace } from 'react-router-redux';
import { getRoute, buildRoute } from '../config/routes.js';
import UrlPattern from 'url-pattern';

import { getProjects } from '../actions/data.actions.js';
import { setProject } from '../actions/current.actions.js';

let store;
let current_pathname = '';

export function connect(s) {
    store = s;
}

export function routerListener(location) {
    if (current_pathname == location.pathname) return;

    current_pathname = location.pathname;
    // url handlers
    if (handleProject(location)) {
        return;
    }
}

// URL Handlers
function handleProjects(location) {
    const pattern = new UrlPattern(getRoute('projects'));
    const params = pattern.match(location.pathname);

    if (params) {
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
        let project = store.getState().current.project;
        let projects = store.getState().data.projects;
        let project_id = params.id * 1;

        if (!project || project.id != project_id) {
            if (!Object.keys(projects).length) {
                // TODO: REFACTOR!!!
                let unsub = store.subscribe(()=>{
                    const loc = store.getState().routing.locationBeforeTransitions.pathname;
                    projects = store.getState().data.projects;
                    if (Object.keys(projects).length > 0) {
                        unsub();
                        if (pattern.match(loc)) {
                            project = store.getState().data.projects[project_id];
                            store.dispatch(setProject(project));
                        }
                    }
                });

            } else {
                project = projects[project_id];
                store.dispatch(setProject(project));
            }
        }
        return true;
    }

    return false;
}