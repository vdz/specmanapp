import React from 'react';
import { connect } from 'react-redux';

import { setPrintMode } from '../../actions/ui.actions.js';
import { docraptor } from '../../helpers/docraptor.js';

const PRINT_MODES = ['section', 'location', 'name']

export class PrintSettings extends React.Component {

    setMode(mode) {
        this.props.setPrintMode(mode);
    }
    
    print() {
        const controls = this.refs.controls;
        controls.classList.add('hidden');

        docraptor({
            method : 'post',
            params : {
                doc : document.documentElement.innerHTML,
                name : this.props.project.name.replace(' ', '_')
            }
        }).then((r) => {
            r = JSON.parse(r);
            if (r.url) {
                controls.classList.remove('hidden');
                this.refs.link.setAttribute('href', r.url);
            }
        })
    }

    getSortControls() {
        const buttons = PRINT_MODES.map(mode => {
            return (
                <button type="button"
                        key={'btn-'+mode}
                        className={'btn ' + ((mode == this.props.print_mode) ? 'btn-primary disabled' : 'btn-secondary')}
                        onClick={() => this.setMode(mode)}>
                    Sort by <strong>{ mode }</strong></button>
            );
        });

        return (
            <div className="btn-group">
                { buttons }
            </div>
        );
    }

    render() {
        const sort = this.getSortControls();
        return (
            <section ref='controls' className="PrintSettings">
                { sort }
                <button onClick={() => this.print()}>Print</button>
                <a ref='link'>Download</a>
            </section>
        )
    }
}

export function mapStateToProps(state) {
    return {
        print_mode : state.ui.print_mode,
        project : state.current.project
    }
}

export default connect(mapStateToProps, {
    setPrintMode
})(PrintSettings);