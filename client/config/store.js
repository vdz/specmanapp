import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import { appReducer, default_state } from '../reducers/index.reducer.js';
import history from '../config/history.js';

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk,
        routerMiddleware(history),
        createLogger({ collapsed: true })
    )
)(createStore);

export default function configureStore(initialState = default_state) {
    const reducer = combineReducers({
        ...appReducer,
        routing : routerReducer
    });

    return createStoreWithMiddleware(reducer, initialState);
}