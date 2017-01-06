import React from 'react';
import { connect } from 'react-redux';

import { NewTypeCompact } from './NewTypeCompact.js';
import { NewLocationCompact } from './NewLocationCompact.js';
import TypeList from './TypeList.js';
import LocationList from './LocationList.js';
import { createType, createLocation } from '../actions/data.actions.js';

export class Types extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_new_type_form : false,
            show_new_location_form : false
        }
    }

    newType(params) {
        params.section_id = this.props.current.section.id;
        this.props.createType(params);
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
        const new_type = (this.state.show_new_type_form)
            ? <NewTypeCompact save={(params) => this.newType(params)}
                                 cancel={() => this.toggleNewForm('type')} />
            : <button type="button"
                      className="btn btn-secondary"
                      onClick={() => this.toggleNewForm('type')}>
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

        return  <section className='Types container'>
                    <div className='row'>
                        <section className='data-wrapper sections col-md'>
                            <div className='row'>
                                <h3 className='col-md'>
                                    Types
                                </h3>
                                <p className='col-md text-muted'>
                                    Create and manage your {this.props.current.section.name} types here
                                </p>
                            </div>
                            <div className='row'>
                                <p className='col-md'>
                                    Search filter here
                                </p>
                            </div>

                            <TypeList />

                            <div className='row'>
                                <div className='col-md py-1'>
                                    { new_type }
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
        types : state.data.types,
        locations : state.data.locations,
        current : state.current
    }
}

export default connect(mapStateToProps, {
    createType,
    createLocation
})(Types);


