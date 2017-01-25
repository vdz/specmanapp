import React from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';
import Dropzone from 'react-dropzone';

import {
    setSection,
    setLocation,
    setType
} from '../actions/current.actions.js';
import { createSpec } from '../actions/data.actions.js';
import { push } from 'react-router-redux';
import { buildRoute } from '../config/routes.js';
import { addClass, removeClass } from '../helpers/utils.js';
import { config } from '../config/config.js';

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
                location_id : location.id,
                fields : [],
                media : []
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

        const spec = nextProps.current.spec;
        if (spec.id) {
            this.props.push(buildRoute('spec', {
                id : nextProps.current.project.id,
                specId : spec.id
            }))
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
        const new_state = {
            ...this.state,
            spec : {
                ...this.state.spec,
                ...params
            }
        };
        this.setState(new_state);
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

    resetCustomForm() {
        this.refs.new_custom_type.value = '';
        this.refs.new_custom_value.value = '';
    }

    addCustomField(type = 'custom') {
        let new_field = {
            label : this.refs['new_' + type +'_type'].value,
            value : this.refs['new_' + type +'_value'].value
        };

        if (!new_field.label || !new_field.value) return;
        this.resetCustomForm();

        let new_state = {...this.state};
        new_state.spec.fields.push(new_field);
        this.setState(new_state);
    }

    editCustomField(index, prop) {
        const value = this.refs[prop+'_custom_'+index].value;
        let new_state = {...this.state};
        new_state.spec.fields[index][prop] = value;
        this.setState(new_state);
    }

    removeCustomField(index) {
        let new_state = { ...this.state};
        new_state.spec.fields.splice(index, 1);
        this.setState(new_state);
    }

    onDrop(files) {
        console.log(files);
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
    
    getCustomFields() {
        let result = [];
        const fields = this.state.spec.fields;

        fields.forEach((item, index) => {
            const ref = 'custom_' + index;
            const is_preset_type = (config.CUSTOM_FIELD_PRESETS.find((type) => (type == item.label))) ? true : false;

            result.push(
                <div key={'key_'+ref}
                          className="form-group row">
                    <div className="col-sm-3 input-group">
                        <input type="text"
                               className="form-control"
                               ref={'label_'+ref}
                               disabled={is_preset_type}
                               value={item.label}
                               onChange={() => this.editCustomField(index, 'label')}
                               placeholder="Field type" />
                    </div>
                    <div className="col-sm input-group">
                        <input type="text"
                               className="form-control"
                               ref={'value_'+ref}
                               value={item.value}
                               onChange={() => this.editCustomField(index, 'value')}
                               placeholder="Value" />
                        <button type="button"
                                onClick={() => this.removeCustomField(index)}
                                className="btn btn-link">Remove</button>
                    </div>
                </div>
                    );
        });

        return  <div>
                    { result }
                </div>;
    }

    getNewPresets() {
        const custom_presets = [];
        const fields = this.state.spec.fields;

        config.CUSTOM_FIELD_PRESETS.forEach(preset => {
            if (fields.find((field) =>  (field.label == preset) )) return;

            const p = preset.toLowerCase();

            custom_presets.push(<div ref='group-custom-new'
                                     key={'custom_'+p+'_block'}
                                     className="form-group row">
                                    <div className="col-sm-3">
                                        <input type="text"
                                               value={preset}
                                               disabled={true}
                                               placeholder="Field name"
                                               className="form-control"
                                               ref={'new_'+p+'_type'} />
                                    </div>
                                    <div className="col-sm">
                                        <div className="input-group">
                                            <input type="text"
                                                   className="form-control"
                                                   ref={'new_'+p+'_value'} />

                                            <button type="button"
                                                    onClick={() => this.addCustomField(p)}
                                                    className="btn btn-link">
                                                Add
                                            </button>
                                        </div>
                                    </div>
                                </div>);
        });

        return custom_presets;

    }

    getNewCustomField() {
        return  <div ref='group-custom-new'
                    className="form-group row border-top-1 border-bottom-1">
                    <div className="col-sm-3">
                        <input type="text"
                               placeholder="Field name"
                               className="form-control"
                               ref='new_custom_type' />
                    </div>
                    <div className="col-sm">
                        <div className="input-group">
                            <input type="text"
                                   className="form-control"
                                   ref='new_custom_value' />

                            <button type="button"
                                    onClick={() => this.addCustomField()}
                                    className="btn btn-link">
                                Add
                            </button>
                        </div>
                    </div>
                </div>;
    }

    getNewImageField() {
        return  <div ref='group-image-new'
                     className="form-group row border-bottom-1">
            <div className="col-sm-3">
                <input type="text"
                       placeholder="Field name"
                       className="form-control"
                       ref='new_image_label' />
            </div>
            <div className="col-sm">
                <div className="input-group">
                    <Dropzone className="form-control"
                              onDrop={(params)=>this.onDrop(params)}>
                        Drop an image here or click to choose image
                    </Dropzone>

                    <button type="button"
                            onClick={() => this.addCustomField()}
                            className="btn btn-link">
                        Add
                    </button>
                </div>
            </div>
        </div>;
    }

    render() {
        const { section } = this.props.current;
        const item = this.state.spec;
        const custom_fields = this.getCustomFields();
        const new_preset_fields = this.getNewPresets();
        const new_custom_field = this.getNewCustomField();

        return  <section className='Spec new container'>
                        <div className="form-group row">
                            <div className="col-sm">
                                <h3 className='display-6'>Create new specification</h3>
                            </div>
                        </div>
                        <div ref='group-main'
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
                            <div className="col-sm-7">
                                <small>Field description</small>
                            </div>
                        </div>
                        <div ref='group'
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
                        </div>

                        <div ref='group-links'
                                  className="form-group row">
                            <div className="col-sm-5">
                                { this.getCombo('section') }
                            </div>
                            <div className="col-sm">
                                <small>Field description</small>
                            </div>
                        </div>
                        <div ref='group'
                                  className="form-group row">
                            <div className="col-sm-5">
                                { this.getCombo('type') }
                            </div>
                            <div className="col-sm">
                                <small>Field description</small>
                            </div>
                        </div>
                        <div ref='group'
                                  className="form-group row border-bottom-1">
                            <div className="col-sm-5">
                                { this.getCombo('location') }
                            </div>
                            <div className="col-sm">
                                <small>Field description</small>
                            </div>
                        </div>

                        { custom_fields }

                        { new_preset_fields }

                        { new_custom_field }

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