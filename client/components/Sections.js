import React from 'react';
import { connect } from 'react-redux';

import { NewSectionCompact } from './NewSectionCompact.js';
import SectionList from './SectionList.js';
import { createSection } from '../actions/data.actions.js';

export class Sections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_new_form : false
        }
    }

    newSection(params) {
        this.props.createSection(params);
    }

    toggleNewForm() {
        this.setState({
            show_new_form : !this.state.show_new_form
        });
    }

    render() {
        const new_section = (this.state.show_new_form)
            ? <NewSectionCompact save={(params) => this.newSection(params)}
                                 cancel={() => this.toggleNewForm()} />
            : <button type="button"
                      className="btn btn-secondary"
                      onClick={() => this.toggleNewForm()}>
            <i className="fa fa-plus fa-2" aria-hidden="true"></i>&nbsp;
            New section
        </button>;

        return  <section className='Items container'>
                    <div className='row'>
                        <section className='data-wrapper col-md'>
                            <div className='row'>
                                <h3 className='col-md'>
                                    Sections
                                </h3>
                                <p className='col-md text-muted'>
                                    Create and manage your sections here
                                </p>
                            </div>
                            <div className='row'>
                                <p className='col-md'>
                                    Search filter here
                                </p>
                            </div>

                            <SectionList />

                            <div className='row'>
                                <div className='col-md py-1'>
                                    { new_section }
                                </div>
                            </div>
                        </section>
                    </div>
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        sections : state.data.sections
    }
}

export default connect(mapStateToProps, {
    createSection
})(Sections);


