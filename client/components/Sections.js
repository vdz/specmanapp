import React from 'react';
import { connect } from 'react-redux';

import { NewSectionCompact } from './NewSectionCompact.js';
import { NewLocationCompact } from './NewLocationCompact.js';
import SectionList from './SectionList.js';
import LocationList from './LocationList.js';
import { createSection, createLocation } from '../actions/data.actions.js';

export class Sections extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_new_section_form : false,
            show_new_location_form : false
        }
    }

    newSection(params) {
        params.project_id = this.props.current.project.id;
        this.props.createSection(params);
    }

    newLocation(params) {
        params.project_id = this.props.current.project.id;
        this.props.createLocation(params);
    }

    toggleNewForm(type) {
        const prop = `show_new_${type}_form`;
        this.setState({
            [prop] : !this.state[prop]
        });
    }

    render() {
        const new_section = (this.state.show_new_section_form)
            ? <NewSectionCompact save={(params) => this.newSection(params)}
                                 cancel={() => this.toggleNewForm('section')} />
            : <button type="button"
                      className="btn btn-secondary"
                      onClick={() => this.toggleNewForm('section')}>
            <i className="fa fa-plus fa-2" aria-hidden="true"></i>&nbsp;
            New section
        </button>;

        const new_location = (this.state.show_new_location_form)
            ? <NewLocationCompact save={(params) => this.newLocation(params)}
                                 cancel={() => this.toggleNewForm('location')} />
            : <button type="button"
                      className="btn btn-secondary"
                      onClick={() => this.toggleNewForm('location')}>
            <i className="fa fa-plus fa-2" aria-hidden="true"></i>&nbsp;
            New Location
        </button>;

        return  <section className='Items container'>
                    <div className='row'>
                        <section className='data-wrapper sections col-md'>
                            <div className='row'>
                                <h3 className='col-md'>
                                    Items
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

                        <section className='data-wrapper locations col-md'>
                            <div className='row'>
                                <h3 className='col-md'>
                                    Locations
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

                            <LocationList />

                            <div className='row'>
                                <div className='col-md py-1'>
                                    { new_location }
                                </div>
                            </div>
                        </section>
                    </div>
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        sections : state.data.sections,
        locations : state.data.locations,
        current : state.current
    }
}

export default connect(mapStateToProps, {
    createSection,
    createLocation
})(Sections);


