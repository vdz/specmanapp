import React from 'react';
import { connect } from 'react-redux';

import { buildRoute } from '../config/routes.js';
import { push } from 'react-router-redux';
import { sortItemsByParam } from '../helpers/utils.js';

export class MiniSpecList extends React.Component {
    constructor(opts) {
        super(opts);

        this.state = {
            view_mode : 'section'
        }
    }

    navigate(specId) {
        this.props.push(buildRoute('spec', {
            id : this.props.project.id,
            specId
        }))
    }
    
    getSpecsByParam(param) {
        const { specs } = this.props.data;
        const categories = this.props.data[param+'s'];
        const cat_id = param+'_id';
        const sorted_ids = sortItemsByParam(specs, cat_id);
        const sorted_parent_ids = Object.keys(categories).sort();
        let list =[];

        if (!sorted_ids.length) return;

        sorted_parent_ids.forEach((category_id) => {
            let inner = [];
            sorted_ids.filter((id) => {
                if (specs[id][cat_id] && specs[id][cat_id] == category_id) {
                    inner.push(
                        <li key={'timy-spec-list-item-'+id}
                            onClick={() => this.navigate(id)}
                            className="">
                            <a href="javascript:;">{specs[id].name}</a>
                        </li>);
                }
            });

            if (inner.length) {
                list.push(
                    <div key={'spec-list-for-'+param+'-'+category_id}
                         className='list-group-item'>
                        <h6 className="d-flex w-100 justify-content-between">
                            { categories[category_id].name }
                            <span className='badge badge-info badge-pill'>
                                { inner.length }
                            </span>
                        </h6>
                        <ul className="list-unstyled mb-0">
                            { inner }
                        </ul>
                    </div>);
            }
        });

        let inner = [];
        sorted_ids.forEach((id) => {
            if (!specs[id][cat_id]) {
                inner.push(
                    <li key={'tiny-spec-list-item-'+id}
                        onClick={() => this.navigate(id)}
                        className="">
                        <a href="javascript:;">{specs[id].name}</a>
                    </li>
                );
            }
        });

        if (inner.length) {
            list.push(
                <div key={'spec-list-for-no-'+param}
                     className='list-group-item'>
                    <h6 className="d-flex w-100 justify-content-between">
                        Unspecified {param}
                        <span className='badge badge-info badge-pill'>
                            { inner.length }
                        </span>
                    </h6>
                    <ul className="list-unstyled mb-0">
                        { inner }
                    </ul>
                </div>);
        }


        return  <div className='list-group'>
                    { list }
                </div>;
    }

    getSpecsByName() {
        const { specs } = this.props.data;
        const sorted_ids = sortItemsByParam(specs, 'name');
        let list =[];

        sorted_ids.forEach((id, index) => {
            list.push(
                <li key={'tiny-spec-list-item-'+id}
                    onClick={() => this.navigate(id)}
                    className="">
                    <a href="javascript:;">{specs[id].name}</a>
                </li>
            );
         });

        return  <div className='list-group'>
                    <div className="list-group-item">
                        <h6 className="d-flex w-100 justify-content-between">
                            All specs
                        <span className='badge badge-info badge-pill'>
                            { sorted_ids.length }
                        </span>
                        </h6>
                        <ol className="list-unstyled">
                            { list }
                        </ol>
                    </div>
                </div>;

    }
    
    render() {
        if (!this.props.project.id) return <div></div>;

        let spec_list;
        switch (this.state.view_mode) {
            case 'section' :
            case 'location' : spec_list = this.getSpecsByParam(this.state.view_mode);
                break;
            default : spec_list = this.getSpecsByName();
        }

        return  <section className='Specs TinyList'>
                    <p className="mb-0">
                        <strong>Current specs</strong>
                    </p>
                    <nav className="nav">
                        <a className='nav-link disabled'><small>Sort by:</small></a>
                        <a href="javascript:;"
                           className="nav-link"
                           onClick={() => this.setState({ view_mode : 'section' })}>
                            <small>sections</small>
                        </a>
                        <a href="javascript:;"
                           className="nav-link"
                           onClick={() => this.setState({ view_mode : 'location' })}>
                            <small>locations</small>
                        </a>
                        <a href="javascript:;"
                           className="nav-link"
                           onClick={() => this.setState({ view_mode : 'name' })}>
                            <small>name</small>
                        </a>
                    </nav>

                    { spec_list }
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        data : state.data,
        spec : state.current.spec,
        project : state.current.project
    }
}

export default connect(mapStateToProps, {
    push
})(MiniSpecList);