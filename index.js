import { render } from 'react-dom';
import React from 'react';
import Root from './client/containers/Root';
import { push } from 'react-router-redux';

import configureStore from './client/config/store.js';
import { syncHistoryWithStore } from 'react-router-redux'
import history from './client/config/history.js';
import { config } from './client/config/config.js';
import { getRoute, buildRoute } from './client/config/routes.js';
import { connect as connectRouteListener, routerListener } from './client/helpers/routeListener.js';

import { setUserProfile } from './client/actions/user.actions.js';

const store = configureStore();
const app_history = syncHistoryWithStore(history, store);

connectRouteListener(store);

function init(options) {

    options.target = options.target || config.DOM_APP_ELEMENT_ID;
    if (typeof options.target == 'string') {
        options.target = document.getElementById(options.target);
    }
    const signin = document.getElementById('signin');
    signin.classList.add('hidden');

    if (options.user) {
        store.dispatch(setUserProfile(options.user));
    }

    app_history.listen(routerListener);

    store.dispatch(push(buildRoute('projects')));

    render(
        <Root store={store} history={app_history} />,
        options.target
    );
}

window.init = init;