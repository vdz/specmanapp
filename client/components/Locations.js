import React from 'react';
import { connect } from 'react-redux';

import { NewLocationCompact } from './NewLocationCompact.js';
import LocationList from './LocationList.js';
import { createLocation } from '../actions/data.actions.js';

export class Locations extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_new_form : false
        }
    }

    newLocation(params) {
        this.props.createLocation(params);
    }

    toggleNewForm() {
        this.setState({
            show_new_form : !this.state.show_new_form
        });
    }

    render() {
        const new_location = (this.state.show_new_form)
            ? <NewLocationCompact save={(params) => this.newLocation(params)}
                                 cancel={() => this.toggleNewForm()} />
            : <button type="button"
                      className="btn btn-secondary"
                      onClick={() => this.toggleNewForm()}>
            <i className="fa fa-plus fa-2" aria-hidden="true"></i>&nbsp;
            New Location
        </button>;

        return  <section className='Locations container'>
                    <div className='row'>
                        <section className='data-wrapper col-md'>
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
        locations : state.data.locations
    }
}

export default connect(mapStateToProps, {
    createLocation
})(Locations);


