import React from 'react';

import Head from '../components/Head.js';
import Breadcrumbs from '../components/Breadcrumbs.js';
import MiniSpecList from '../components/MiniSpecList.js';
import ModalController from '../components/ModalController.js';

export class App extends React.Component {
    render() {
        return  <section className='app-container'>
                    <Head />
                    <Breadcrumbs />
                    <section className='row'>
                        <div className='col-sm-8'>
                            { this.props.children }
                        </div>
                        <div className='col-sm-4'>
                            <MiniSpecList />
                        </div>
                    </section>
                    <ModalController />
                </section>;
    }
}