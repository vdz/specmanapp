import React from 'react';
import { connect } from 'react-redux';

import { sortItemsByParam } from '../../helpers/utils.js';

export class PrintListByMode extends React.Component {

    getContentByParam(param) {
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
                        <li key={'tiny-spec-list-item-'+id}
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

    getContentByName() {
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
        const list = (this.props.print_mode == 'name')
            ? this.getContentByName()
            : this.getContentByParam(this.props.print_mode);

        return (
            <section>
                { list }
            </section>
        )

    }
}

export function mapStateToProps(state) {
    return {
        data : state.data,
        project : state.current.project,
        print_mode : state.ui.print_mode
    }
}

export default connect(mapStateToProps, {})(PrintListByMode);
