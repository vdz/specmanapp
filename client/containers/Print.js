import React from 'react';
import { connect } from 'react-redux';

import { TOC } from '../components/print/TOC.js';
import PrintListByMode from '../components/print/PrintListByMode.js';
import { LegalPrint } from '../components/print/LegalPrint.js';
import PrintSettings from '../components/print/PrintSettings.js';

const host_url = 'https://specman.herokuapp.com';

export class Print extends React.Component {
    render() {
        const { project } = this.props;

        return  (
            <section className='print-container'>
                <PrintSettings />
                <section className='print-content'>
                    <section className="cover">
                        <h1 className='project'>
                            { project && project.name }
                        </h1>
                        <div className="credit">
                            Home Specification Guide & Contract
                            <img className='logo' src={host_url + '/images/arh-logo.png'} />
                        </div>
                    </section>
                    <TOC />
                    <PrintListByMode />
                    <LegalPrint project_id={project && project.id} />
                    <section className="cover" />
                </section>
            </section>
        );
    }
}

export function mapStateToProps(state) {
    return {
        print_mode : state.ui.print_mode,
        project : state.current.project
    }
}

export default connect(mapStateToProps, null)(Print);