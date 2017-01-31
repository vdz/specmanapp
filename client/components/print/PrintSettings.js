import React from 'react';
import { connect } from 'react-redux';

import { setPrintMode } from '../../actions/ui.actions.js';

const PRINT_MODES = ['section', 'location', 'name']

export class PrintSettings extends React.Component {

    setMode(mode) {
        this.props.setPrintMode(mode);
    }

    getSortControls() {
        const buttons = PRINT_MODES.map(mode => {
            return (
                <button type="button"
                        key={'btn-'+mode}
                        className={'btn ' + ((mode == this.props.print_mode) ? 'btn-primary disabled' : 'btn-secondary')}
                        onClick={() => this.setMode(mode)}>
                    Sort by <strong>mode</strong></button>
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
            <section className="PrintSettings">
                { sort }
            </section>
        )
    }
}

export function mapStateToProps(state) {
    return {
        print_mode : state.ui.print_mode
    }
}

export default connect(mapStateToProps, {
    setPrintMode
})(PrintSettings);