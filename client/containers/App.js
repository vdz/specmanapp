import React from 'react';

import Head from '../components/Head.js';

export class App extends React.Component {
    render() {
        return  <section className='app-container'>
                    <Head />
                    { this.props.children }
                </section>;
    }
}