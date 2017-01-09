import React from 'react';
import InlineEdit from 'react-edit-inline';

export class TypeListItem extends React.Component {
    save(params) {
        const { id } = this.props.item;
        this.props.update({
            id,
            ...params
        });
    }

    ['delete']() {
        const { item } = this.props;
        this.props.delete(item);

    }

    choose() {
        const { id } = this.props.item;
        this.props.manage(id);
    }

    newSpec() {
        const { id } = this.props.item;
        console.log(id);
    }

    render() {
        const { item } = this.props;
        return  <section className='TypeListItem row'
                         onClick={() => this.choose()}>
                    <div className='col-md'>
                        <InlineEdit text={item.name}
                                    paramName='name'
                                    className='editable'
                                    change={(params) => this.save(params)}
                                    activeClassName='form-control'
                                    stopPropagation={true}
                                    staticElement='h6' />
                        <p className="uncoverme">
                            <InlineEdit text={item.description}
                                        placeholder='Description'
                                        paramName='description'
                                        className='editable'
                                        staticElement='small'
                                        editingElement='input'
                                        change={(params) => this.save(params)}
                                        stopPropagation={true}
                                        activeClassName='form-control form-control-sm' />
                        </p>
                    </div>
                    <div className='col-md controls uncoverme'
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