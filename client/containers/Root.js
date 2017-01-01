import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from '../config/routes.js';

const Root = React.createClass({
    render() {
        const { store, history } = this.props;

        return (
            <Provider store={store}>
                <Router history={history}>
                    { routes() }
                </Router>
            </Provider>
        );
    }
});

Root.propTypes = {
    store :  PropTypes.object.isRequired,
    history : PropTypes.object.isRequired
};

export default Root;