import React from 'react';
import { connect } from 'react-redux';

import { TOC } from '../components/print/TOC.js';
import PrintListByMode from '../components/print/PrintListByMode.js';
import { LegalPrint } from '../components/print/LegalPrint.js';
import PrintSettings from '../components/print/PrintSettings.js';

export class Print extends React.Component {
    render() {
        const project_id = this.props.params.project_id;

        return  (
            <section className='print-container'>
                <PrintSettings />
                <section className='print-content'>
                    <section className="front-cover"></section>
                    <TOC />
                    <PrintListByMode />
                    <LegalPrint project_id={project_id} />
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