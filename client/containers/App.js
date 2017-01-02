import React from 'react';

import { Head } from '../components/Head.js';

export class App extends React.Component {
    render() {
        return  <section className='app-container'>
                    <section className='container'>
                        <div className='row'>
                            <Head className='col-lg' />
                        </div>
                        <div className='row'>
                            { this.props.children }
                        </div>
                    </section>
                </section>;
    }
}