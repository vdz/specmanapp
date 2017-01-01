import { render } from 'react-dom';
import React from 'react';
import Root from './client/containers/Root';

import configureStore from './client/config/store.js';
import { syncHistoryWithStore } from 'react-router-redux'
import history from './client/config/history.js';

const store = configureStore();
const app_history = syncHistoryWithStore(history, store);


render(
    <Root store={store} history={app_history} />,
    document.getElementById('app')
);