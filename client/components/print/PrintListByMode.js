import React from 'react';
import { connect } from 'react-redux';

import { SpecPrintModule } from './SpecPrintModule.js';
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
                    inner.push(<SpecPrintModule key={'spec-print-'+id} spec={specs[id]} />);
                }
            });

            if (inner.length) {
                list.push(
                    <div key={'chapter-'+param+'-'+category_id}
                         className={'chapter ' + param}>
                        <h2 className='category-title' id={param+'_'+category_id}>
                            { categories[category_id].name }
                        </h2>
                        { inner }
                    </div>);
            }
        });

        let inner = [];
        sorted_ids.forEach((id) => {
            if (!specs[id][cat_id]) {
                inner.push(<SpecPrintModule key={'spec-print-'+id} spec={specs[id]} />);
            }
        });

        if (inner.length) {
            list.push(
                <div key={'chapter-no-'+param}
                     className={'chapter ' + param}>
                    <h2 className='category-title' id={param+'_unspecified'}>
                        Unspecified { param }
                    </h2>
                    { inner }
                </div>
            );
        }


        return  (
            <div className='content'>
                { list }
            </div>
        );
    }

    getContentByName() {
        const { specs } = this.props.data;
        const sorted_ids = sortItemsByParam(specs, 'order');
        let list =[];

        sorted_ids.forEach((id) => {
            list.push(<SpecPrintModule id={'spec-'+id} key={'spec-print-'+id} spec={specs[id]} />);
        });

        return  (
            <div className='content'>
                { list }
            </div>
        );

    }

    render() {
        const list = (this.props.print_mode == 'name')
            ? this.getContentByName()
            : this.getContentByParam(this.props.print_mode);

        if (Object.keys(this.props.data.specs).length) {
            window.docPrintReady = true;
        }

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
