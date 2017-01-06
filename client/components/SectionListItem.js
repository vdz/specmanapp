import React from 'react';
import InlineEdit from 'react-edit-inline';

export class SectionListItem extends React.Component {
    save(params) {
        const { id } = this.props.item;
        this.props.update({
            id,
            ...params
        });
    }

    ['delete']() {
        const { id } = this.props.item;
        this.props.delete(id);

    }

    choose() {
        const { id } = this.props.item;
        this.props.manage(id);
    }

    newSpec() {

    }

    render() {
        const { item } = this.props;
        return  <section className='SectionListItem row'
                         onClick={() => this.choose()}>
                    <div className='col-md'>
                        <InlineEdit text={item.name}
                                    paramName='name'
                                    className='editable'
                                    change={(params) => this.save(params)}
                                    activeClassName='form-control'
                                    stopPropagation={true}
                                    staticElement='h6' />
                        <p className='description uncoverme'>
                            <InlineEdit text={item.description}
                                        paramName='description'
                                        placeholder='Description'
                                        className='editable'
                                        staticElement='small'
                                        editingElement='input'
                                        change={(params) => this.save(params)}
                                        stopPropagation={true}
                                        activeClassName='form-control form-control-sm' />
                        </p>
                    </div>
                    <div className='col-md-3 controls uncoverme'
                         onClick={(e) => {
                            this.newSpec();
                            e.stopPropagation();
                         }}>
                        <button className='btn btn-primary'>
                            New spec
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