import React from 'react';
import { connect } from 'react-redux';

import { NewTypeCompact } from './NewTypeCompact.js';
import TypeList from './TypeList.js';
import { createType } from '../actions/data.actions.js';

export class Types extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_new_form : false
        }
    }

    newType(params) {
        params.section_id = this.props.current.section.id;
        this.props.createType(params);
    }

    toggleNewForm() {
        this.setState({
            show_new_form : !this.state.show_new_form
        });
    }

    render() {
        const new_type = (this.state.show_new_form)
            ? <NewTypeCompact save={(params) => this.newType(params)}
                                 cancel={() => this.toggleNewForm()} />
            : <button type="button"
                      className="btn btn-secondary"
                      onClick={() => this.toggleNewForm()}>
            <i className="fa fa-plus fa-2" aria-hidden="true"></i>&nbsp;
            New type
        </button>;

        return  <section className='Types container'>
                    <div className='row'>
                        <section className='data-wrapper col-md'>
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
                    </div>
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        types : state.data.types,
        current : state.current
    }
}

export default connect(mapStateToProps, {
    createType
})(Types);


