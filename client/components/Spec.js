import React from 'react';
import { connect } from 'react-redux';
import InlineEdit from 'react-edit-inline';

import {
    setSection,
    setLocation,
    setType
} from '../actions/current.actions.js';
import { updateSpec, deleteSpec, deleteField, deleteDoc } from '../actions/data.actions.js';
import { push } from 'react-router-redux';
import { buildRoute } from '../config/routes.js';
import { addClass, removeClass, thumbnail } from '../helpers/utils.js';
import { config } from '../config/config.js';
import  { showModal } from '../actions/ui.actions.js';

export class Spec extends React.Component {
    constructor(props) {
        super(props);

        const { project, section, type, location, spec } = this.props.current;

        this.state = {
            spec : {
                name : '',
                description : '',
                project_id : project.id,
                section_id : section.id,
                type_id : type.id,
                location_id : location.id,
                fields : [],
                docs : [],
                ...spec
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
        const curr_spec = this.props.current.spec;
        if (JSON.stringify(curr_spec) !== JSON.stringify(spec)) {
            this.setState({
                ...this.state,
                spec: {
                    ...curr_spec,
                    ...spec
                }
            });
        }
    }

    componentDidUpdate(prevProps) {
        const prev_spec = prevProps.current.spec;
        const spec = this.props.current.spec;

        if (JSON.stringify(prev_spec) !== JSON.stringify(spec) && spec.id) {
            spec.section_id && this.select('section', spec.section_id);
            spec.location_id && this.select('location', spec.location_id);
        }

        if (JSON.stringify(this.props.current.section) != JSON.stringify(prevProps.current.section)
            && !prevProps.current.section.id
            && prevProps.current.spec.type_id) {
            this.select('type', this.props.current.spec.type_id);
        }
    }

    select(type, id) {
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

    update() {
        const { spec } = this.state;
        if (spec.name && (spec.location_id || spec.section_id)) {
            this.props.updateSpec(this.state.spec);
        } else {
            alert('Cannot save!\n You need to fill spec name and choose either section or a location');
        }
    }

    cancel() {
        this.props.push(buildRoute('sections', {
            id :  this.props.current.project.id
        }))
    }

    ['delete']() {
        if (confirm('Are you sure you want to delete this spec?')) {
            this.props.deleteSpec(this.props.current.spec.id);
            this.cancel();
        }
    }

    resetCustomForm() {
        this.refs.new_custom_type.value = '';
        this.refs.new_custom_value.value = '';
    }

    resetImageForm() {
        this.refs.new_image_label.value = this.refs.new_image_label.defaultValue;
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

    editCustomField(index, prop, collection = 'fields') {
        const field_name = prop+'_'+collection+'_'+index;
        const value = this.refs[field_name].value;
        let new_state = {...this.state};
        new_state.spec[collection][index][prop] = value;
        this.setState(new_state);
    }

    removeCustomField(index) {
        let new_state = { ...this.state};
        let field = new_state.spec.fields[index];
        new_state.spec.fields.splice(index, 1);
        this.setState(new_state);

        if (field.id) { this.props.deleteField(field);}
    }

    mapUploadedResults(results) {
        return results.map(item => {
           return {
               url : item.url,
               thumb : item.thumbnail_url,
               remote_id : item.public_id,
               meta : JSON.stringify({
                   pages : item.pages,
                   format : item.format,
                   resource_type : item.resource_type,
                   height: item.height,
                   width : item.width,
                   bytes : item.bytes,
                   created_at : item.created_at,
                   etag : item.etag,
                   existing : item.existing,
                   path : item.path,
                   secure_url : item.secure_url,
                   signature : item.signature,
                   type : item.type,
                   version : item.version
                }),
               label : item.original_filename
           }
        });
    }

    addImageFields(fields) {
        let new_state = {...this.state};
        const label = this.refs.new_image_label.value;

        this.resetImageForm();

        if (!label || !fields.length) return;

        fields.forEach(field => {
            new_state.spec.docs.push({
                ...field,
                label
            })
        });
        this.setState(new_state);
    }

    removeImageField(index) {
        let new_state = { ...this.state};
        let doc = new_state.spec.docs[index];
        new_state.spec.docs.splice(index, 1);
        this.setState(new_state);

        if (doc.id) { this.props.deleteDoc(doc);}
    }

    openImageWidget() {
        cloudinary.openUploadWidget({
            cloud_name : config.CLOUDINARY.name,
            upload_preset : 'mtuq44zw',
            multiple : true,
            client_allowed_formats : ['jpg','gif','jpeg','png','pdf']
        }, (err, res) => {
            if (err) {
                console.log('image upload:', err);
                return;
            }
            this.addImageFields(this.mapUploadedResults(res));
        })
    }
    
    getCombo(type) {
        let list = [];
        const items = (type == 'type')
            ? this.props.current.section.types
            : this.props.data[type+'s'];
        const current = items && items[this.state.spec[type + '_id']];

        items && Object.keys(items).map(id => {
            const item = items[id];
            list.push(<option key={type+'s-combo-'+id}
                              value={id}>{item.name}</option>);
        });
        return  <select className='form-control'
                        value={current ? current.id : 0}
                        onChange={(e)=>this.select(type, e.target.value * 1)}>
                    <option value='0' key={type+'s-combo-default'}>
                        {type.toUpperCase()}
                    </option>
                    { list }
                </select>;
    }

    getCustomFields() {
        let result = [];
        const fields = this.state.spec.fields;

        fields && fields.forEach((item, index) => {
            const ref = 'fields_' + index;
            const is_preset_type = (config.CUSTOM_FIELD_PRESETS.find((type) => (type == item.label))) ? true : false;

            result.push(
                <div key={'key_'+ref}
                     className='form-group row'>
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

    getImageFields() {
        let result =[];
        const fields = this.state.spec.docs;

        fields && fields.forEach((item, index) => {
            const ref = 'docs_' + index;

            result.push(
                <div className='row form-group' key={'custom_image_block_'+index}>
                    <div className='col-sm-4'>
                        <a href={item.url}
                           title='Cmd+click to open the image in a new tab'
                           className="figure">
                            <img src={thumbnail(item.url)}
                                 ref={ref}
                                 className="img-thumbnail image-fluid rounded figure-image" />
                        </a>
                    </div>
                    <div className='col-sm'>
                        <div className='input-group'>
                            <input type="text"
                                   className="form-control"
                                   ref={'label_'+ref}
                                   value={item.label}
                                   onChange={() => this.editCustomField(index, 'label', 'docs')}
                                   placeholder="Image label" />

                            <button type="button"
                                    onClick={() => this.removeImageField(index)}
                                    className="btn btn-link">Remove</button>
                        </div>
                    </div>
                </div>
            )
        });
        return  <div>
                    { result }
                </div>;
    }

    getNewPresets() {
        const custom_presets = [];
        const fields = this.state.spec.fields;

        config.CUSTOM_FIELD_PRESETS.forEach((preset, index) => {
            if (fields.find((field) =>  (field.label == preset) )) return;

            const p = preset.toLowerCase();

            custom_presets.push(<div ref='group-custom-new'
                                     key={'custom_'+p+'_block'}
                                     className='form-group row'>
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
                <button type="button"
                        onClick={()=>this.openImageWidget()}
                        className="btn btn-outline-primary">
                    Upload an image
                </button>
            </div>
            <div className="col-sm">
                <div className="input-group">
                    <input type="text"
                           placeholder="Image label"
                           className="form-control"
                           defaultValue="New image"
                           ref='new_image_label' />

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
        const item = this.props.current.spec;
        if (!item.id) return <div />;

        const custom_fields = this.getCustomFields();
        const new_preset_fields = this.getNewPresets();
        const new_custom_field = this.getNewCustomField();
        const new_image_field = this.getNewImageField();
        const image_fields = this.getImageFields();

        return  <section className='Spec new container'>
                        <div className="form-group row">
                            <div className="col-sm">
                                <h3 className='display-6'>{item.name} specification</h3>
                            </div>
                        </div>
                        <div ref='group-main'
                             className="form-group row">
                            <div className="col-sm-5">
                                <InlineEdit text={item.name}
                                            paramName='name'
                                            editing={false}
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
                                            editing={false}
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

                        { image_fields }
                        { new_image_field }

                        <div className="form-group row">
                            <div className="col-sm">
                                <button type="button"
                                        ref="save_btn"
                                        onClick={() => this.update()}
                                        className="btn btn-primary">Save</button>
                                &nbsp;
                                <button type="button"
                                        onClick={() => this.cancel()}
                                        className="btn btn-secondary">Cancel</button>
                            </div>
                            <div className="col-sm-3">
                                <button type="button"
                                        onClick={() => this.delete()}
                                        className="btn btn-secondary btn-danger">Delete</button>
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
    updateSpec,
    deleteSpec,
    deleteField,
    deleteDoc,
    push,
    showModal
})(Spec);