import React from 'react';
import { Route } from 'react-router';
import { Options } from '../helpers/mixins.js';

import { App } from '../containers/App.js';

export const default_routes = {
    base : '/',
    login : '/login',
    projects : '/projects',
    project : '/project/:id',
    sections : '/project/:id/sections',
    section : '/project/:id/section/:sectionId',
    locations : '/project/:id/locations',
    types : '/project/:id/section/:sectionId/types',
    spec : '/project/:id/section/:sectionId/spec/:specId'
};

let routes = {...default_routes};

export function setRoutes(map) {
    routes = Options.setOptions(routes, map);
}

export function getRoute(name) {
    return routes[name];
}

export function buildRoute(name, args) {
    let route = routes[name];
    
    for(let key in args) {
        route = route.replace(`:${key}`, args[key]);
    }
    
    return route;
}

export default () => {
    return  <Route>
                <Route path={routes.base} component={App}>
                    
                </Route>
            </Route>
}