import React from 'react';
import InlineEdit from 'react-edit-inline';

export class SectionListItem extends React.Component {
    save(params) {
        const { id } = this.props.section;
        this.props.update({
            id,
            ...params
        });
    }

    ['delete']() {
        const { id } = this.props.section;
        this.props.delete(id);
    }

    choose() {
        const { id } = this.props.section;
        this.props.manage(id);
    }

    newSpec() {

    }

    render() {
        const { section } = this.props;
        return  <section className='SectionListItem row'
                         onClick={() => this.choose()}>
                    <div className='col-md-4'>
                        <InlineEdit text={section.name}
                                    paramName='name'
                                    className='editable'
                                    change={(params) => this.save(params)}
                                    activeClassName='form-control'
                                    stopPropagation={true}
                                    staticElement='h6' />
                    </div>
                    <div className='col-md description uncoverme'>
                        <p>
                            <InlineEdit text={section.description}
                                        paramName='description'
                                        className='editable'
                                        staticElement='small'
                                        editingElement='textarea'
                                        change={(params) => this.save(params)}
                                        stopPropagation={true}
                                        activeClassName='form-control form-control-sm h-100' />
                        </p>
                    </div>
                    <div className='col-md-3 controls uncoverme'
                         onClick={() => this.newSpec()}>
                        <button className='btn btn-primary'>
                            New spec
                        </button>
                        <button className='btn btn-link text-danger'
                                onClick={() => this.delete()}>
                            <i className="fa fa-times fa-4" aria-hidden="true"></i>&nbsp;
                            Delete
                        </button>
                    </div>
                </section>;
    }
}