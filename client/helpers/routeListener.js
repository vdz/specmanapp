import { push, replace } from 'react-router-redux';
import { getRoute, buildRoute } from '../config/routes.js';
import UrlPattern from 'url-pattern';

import { getProjects } from '../actions/data.actions.js';

let store;
let current_pathname = '';

export function connect(s) {
    store = s;
}

export function routerListener(location) {
    if (current_pathname == location.pathname) return;

    current_pathname = location.pathname;
    // url handlers
    if (handleProjects(location)) {
        return;
    }
}

// URL Handlers
function handleProjects(location) {
    const pattern = new UrlPattern(getRoute('projects'));
    const params = pattern.match(location.pathname);

    if (params) {
        let projects = store.getState().data.projects;
        if (!projects) {
            store.dispatch(getProjects());
        }
        return true;
    }

    return false;
}