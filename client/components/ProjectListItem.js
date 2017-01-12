import React from 'react';
import InlineEdit from 'react-edit-inline';

export class ProjectListItem extends React.Component {
    save(params) {
        const { id } = this.props.project;
        this.props.update({
            id,
            ...params
        });
    }

    ['delete']() {
        const { id } = this.props.project;
        this.props.delete(id);
    }

    choose() {
        const { id } = this.props.project;
        this.props.manage(id);
    }

    render() {
        const { project } = this.props;
        return  <section className='ProjectListItem row'
                         onClick={() => this.choose()}>
                    <div className='col-sm'>
                        <InlineEdit text={project.name}
                                    paramName='name'
                                    className='editable'
                                    change={(params) => this.save(params)}
                                    activeClassName='form-control'
                                    stopPropagation={true}
                                    staticElement='h6' />
                        <p>
                            <InlineEdit text={project.address}
                                        paramName='address'
                                        className='editable'
                                        staticElement='small'
                                        change={(params) => this.save(params)}
                                        stopPropagation={true}
                                        activeClassName='form-control form-control-sm' />

                            <InlineEdit text={project.client}
                                        paramName='client'
                                        className='editable'
                                        staticElement='small'
                                        change={(params) => this.save(params)}
                                        stopPropagation={true}
                                        activeClassName='form-control form-control-sm' />

                            <InlineEdit text={project.description}
                                        paramName='description'
                                        className='editable'
                                        staticElement='small'
                                        editingElement='textarea'
                                        change={(params) => this.save(params)}
                                        stopPropagation={true}
                                        activeClassName='form-control form-control-sm h-100' />
                        </p>
                    </div>
                    <div className='col-sm controls uncoverme'>
                        <button className='btn btn-primary'>
                            Manage
                        </button>
                        <button className='btn btn-link text-danger'
                                onClick={(e) => {
                                    this.delete();
                                    e.stopPropagation();
                                }}>
                            <i className="fa fa-times fa-4" aria-hidden="true"></i>&nbsp;
                            Delete
                        </button>
                    </div>
                </section>;
    }
}