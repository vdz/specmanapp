import React from 'react';

import { BigHead } from '../components/Head.js';

export class Welcome extends React.Component {
    render() {
        return  <section className='app-container'>
                    <section className='container'>
                        <div className='row'>
                            <BigHead className='col-lg' />
                        </div>
                        <div className='row'>
                            { this.props.children }
                        </div>
                    </section>
                </section>;
    }
}