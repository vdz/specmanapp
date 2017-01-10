import React from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';

import {
    setSection,
    setLocation,
    setType
} from '../actions/current.actions.js';
import { createSpec } from '../actions/data.actions.js';
import { push } from 'react-router-redux';
import { buildRoute } from '../config/routes.js';

export class NewSpec extends React.Component {
    constructor(props) {
        super(props);

        const { project, section, type, location } = this.props.current;

        this.state = {
            spec : {
                name : '',
                description : '',
                project_id : project.id,
                section_id : section.id,
                type_id : type.id,
                location_id : location.id
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.current.project != nextProps.current.project) {
            this.setState({
                ...this.state,
                spec : {
                    ...this.state.spec,
                    project_id: nextProps.current.project.id
                }
            });
        }
    }

    select(type, e) {
        const id = e.target.value * 1;
        const item = (type == 'type')
            ? this.props.current.section.types[id]
            : this.props.data[type+'s'][id];
        this.props['set_'+type](item);

        this.save({
            [type + '_id'] : id
        });
    }

    save(params) {
        this.state = {
            ...this.state,
            spec : {
                ...this.state.spec,
                ...params
            }
        };
    }

    createNew() {
        const { spec } = this.state;
        if (spec.name && (spec.location_id || spec.section_id)) {
            this.props.createSpec(this.state.spec);
        }
    }

    cancel() {
        this.props.push(buildRoute('sections', {
            id :  this.props.current.project.id
        }))
    }
    
    getCombo(type) {
        let list = [];
        const items = (type == 'type')
            ? this.props.current.section.types
            : this.props.data[type+'s'];
        const current = this.props.current[type];

        items && Object.keys(items).map(id => {
            const item = items[id];
            list.push(<option key={type+'s-combo-'+id}
                              value={id}>{item.name}</option>);
        });
        return  <select className='form-control'
                        value={current ? current.id : 0}
                        onChange={(params)=>this.select(type, params)}>
                    <option value='0' key={type+'s-combo-default'}>
                        {type.toUpperCase()}
                    </option>
                    { list }
                </select>;
    }

    render() {
        const { section, type, location } = this.props.current;
        const item = this.state.spec;

        return  <section className='Spec new container'>
                    <form>
                        <div className="form-group row">
                            <div className="col-sm">
                                <h3 className='display-6'>Create new specification</h3>
                            </div>
                        </div>
                        <fieldset ref='group'
                             className="form-group row">
                            <div className="col-sm-5">
                                <InlineEdit text={item.name}
                                            paramName='name'
                                            editing={true}
                                            placeholder='Name'
                                            className='editable'
                                            staticElement='p'
                                            editingElement='input'
                                            change={(params) => this.save(params)}
                                            stopPropagation={true}
                                            activeClassName='form-control' />
                            </div>
                            <div className="col-sm">
                                <small>Field description</small>
                            </div>
                        </fieldset>
                        <fieldset ref='group'
                                  className="form-group row border-bottom-1">
                            <div className="col-sm-5">
                                <InlineEdit text={item.description}
                                            paramName='description'
                                            editing={true}
                                            placeholder='Description'
                                            className='editable'
                                            staticElement='p'
                                            editingElement='input'
                                            change={(params) => this.save(params)}
                                            stopPropagation={true}
                                            activeClassName='form-control' />
                            </div>
                            <div className="col-sm">
                                <small>Field description</small>
                            </div>
                        </fieldset>

                        <fieldset ref='group'
                                  className="form-group row">
                            <div className="col-sm-5">
                                { this.getCombo('section') }
                            </div>
                            <div className="col-sm">
                                <small>Field description</small>
                            </div>
                        </fieldset>
                        <fieldset ref='group'
                                  className="form-group row">
                            <div className="col-sm-5">
                                { this.getCombo('type') }
                            </div>
                            <div className="col-sm">
                                <small>Field description</small>
                            </div>
                        </fieldset>
                        <fieldset ref='group'
                                  className="form-group row border-bottom-1">
                            <div className="col-sm-5">
                                { this.getCombo('location') }
                            </div>
                            <div className="col-sm">
                                <small>Field description</small>
                            </div>
                        </fieldset>

                        <div className="form-group row">
                            <div className="col-sm">
                                <button type="button"
                                        onClick={() => this.createNew()}
                                        className="btn btn-primary">Create new</button>
                                &nbsp;
                                <button type="button"
                                        onClick={() => this.cancel()}
                                        className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </form>
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        current : state.current,
        data : state.data
    }
}

export default connect(mapStateToProps, {
    set_section : setSection,
    set_location : setLocation,
    set_type : setType,
    createSpec,
    push
})(NewSpec);