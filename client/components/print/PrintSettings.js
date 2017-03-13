import React from 'react';
import { connect } from 'react-redux';

import { setPrintMode } from '../../actions/ui.actions.js';
import { docraptor, getRawPrintCSS } from '../../helpers/print_api.js';
import { addClass, removeClass } from '../../helpers/utils.js';

const PRINT_MODES = ['section', 'location', 'name'];

export class PrintSettings extends React.Component {

    setMode(mode) {
        this.props.setPrintMode(mode);
    }

    injectCSS(css_content) {
        const print_css = document.getElementById('print_css');
        const head = document.head;
        const style = document.createElement('style');

        head.appendChild(style);
        style.type = 'text/css';

        style.appendChild(document.createTextNode(css_content));
        head.removeChild(print_css);
    }

    print() {
        const controls = this.refs.controls;
        const link = this.refs.link;
        getRawPrintCSS().then(css => {
            this.injectCSS(css);

            addClass(controls, 'hidden');

            docraptor({
                method : 'post',
                params : {
                    doc : document.documentElement.innerHTML,
                    name : this.props.project.name.replace(' ', '_')
                }
            }).then((r) => {
                r = JSON.parse(r);
                if (r.url) {
                    removeClass(controls, 'hidden');
                    removeClass(link, 'hidden');
                    link.setAttribute('href', r.url);
                }
            })
        });

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
            <div className="sorting btn-group">
                { buttons }
            </div>
        );
    }

    render() {
        const sort = this.getSortControls();
        return (
            <section ref='controls' className="PrintSettings">
                <a className='back' href="/">Back to project list</a>
                { sort }
                <div className='printing'>
                    <button className="print"
                            onClick={() => this.print()}>
                        Print
                    </button>
                    <a ref='link'
                       className="download hidden">
                        Download
                    </a>
                </div>
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