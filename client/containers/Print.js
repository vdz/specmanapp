import React from 'react';
import { connect } from 'react-redux';

import { TOC } from '../components/print/TOC.js';
import { SectionPrintList } from '../components/print/SectionPrintList.js';
import { LegalPrint } from '../components/print/LegalPrint.js';

export class Print extends React.Component {
    render() {
        const project_id = this.props.params.project_id;

        return  (
            <section className='print-container'>
                <section className="front-cover"></section>

                <TOC project_id={project_id} />
                <SectionPrintList project_id={project_id} />
                <LegalPrint project_id={project_id} />
            </section>
        );
    }
}