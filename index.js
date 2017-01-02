import { render } from 'react-dom';
import React from 'react';
import Root from './client/containers/Root';

import configureStore from './client/config/store.js';
import { syncHistoryWithStore } from 'react-router-redux'
import history from './client/config/history.js';
import { config } from './client/config/config.js';

import { setUserProfile } from './client/actions/user.actions.js';

const store = configureStore();
const app_history = syncHistoryWithStore(history, store);

function init(options) {

    options.target = options.target || config.DOM_APP_ELEMENT_ID;
    if (typeof options.target == 'string') {
        options.target = document.getElementById(options.target);
    }

    if (options.user) {
        store.dispatch(setUserProfile(options.user));
    }

    const signin = document.getElementById('signin');
    signin.classList.add('hidden');

    render(
        <Root store={store} history={app_history} />,
        options.target
    );
}

window.init = init;