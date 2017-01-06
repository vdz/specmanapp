import React from 'react';

import Head from '../components/Head.js';
import Breadcrumbs from '../components/Breadcrumbs.js';

export class App extends React.Component {
    render() {
        return  <section className='app-container'>
                    <Head />
                    <Breadcrumbs />
                    { this.props.children }
                </section>;
    }
}