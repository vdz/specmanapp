import React from 'react';
import { connect } from 'react-redux';

import { sortItemsByParam } from '../../helpers/utils.js';

export class TOC extends React.Component {
    getTOCByParam(param) {
        const { specs } = this.props.data;
        const categories = this.props.data[param+'s'];
        const cat_id = param+'_id';
        const sorted_ids = sortItemsByParam(specs, cat_id);
        const sorted_parent_ids = Object.keys(categories).sort();
        let list =[];

        if (!sorted_ids.length) return;

        sorted_parent_ids.forEach((category_id) => {
            let counter = 0;
            sorted_ids.filter((id) => {
                if (specs[id][cat_id] && specs[id][cat_id] == category_id) {
                    counter++
                }
            });

            if (counter) {
                list.push(
                        <li key={'toc-category-title-'+param+'_'+category_id}>
                            <a className='toc-item' href={'#'+param+'_'+category_id}>
                                { categories[category_id].name }&nbsp;
                                <em>({ counter })</em>
                            </a>
                        </li>
                );
            }
        });

        let counter = 0;
        sorted_ids.forEach((id) => {
            if (!specs[id][cat_id]) {
                counter++;
            }
        });

        if (counter) {
            list.push(
                <li key={'toc-category-title-unspecified'}>
                    <a className='toc-item' href={'#'+param+'_unspecified'}>
                        Unspecified { param }&nbsp;
                        <em>({ counter })</em>
                    </a>
                </li>
            );
        }


        return  (
            <ul className='toc-list'>
                { list }
            </ul>
        );
    }

    getTOCByName() {
        const { specs } = this.props.data;
        const sorted_ids = sortItemsByParam(specs, 'name');
        let list =[];

        sorted_ids.forEach((id, index) => {
            list.push(
                <li key={'toc-spec-title-'+id}>
                    <a className='toc-item' href={'#spec-'+id}>
                        { specs[id].name }
                    </a>
                </li>
            );
        });

        return  (
            <ul className='toc-list'>
                { list }
            </ul>
        );

    }

    render() {
        const list = (this.props.print_mode == 'name')
            ? this.getTOCByName()
            : this.getTOCByParam(this.props.print_mode);

        return (
            <section className='TOC'>
                <h1 className='page-title'>Table of Contents</h1>
                {list}
            </section>
        )

    }
}

export function mapStateToProps(state) {
    return {
        data : state.data,
        print_mode : state.ui.print_mode
    }
}

export default connect(mapStateToProps, {})(TOC);

