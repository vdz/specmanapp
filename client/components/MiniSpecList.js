import React from 'react';
import { connect } from 'react-redux';

import { buildRoute } from '../config/routes.js';
import { push } from 'react-router-redux';
import { sortItemsByParam } from '../helpers/utils.js';

export class MiniSpecList extends React.Component {
    constructor(opts) {
        super(opts);

        this.state = {
            view_mode : 'sections'
        }
    }

    navigate(specId) {
        this.props.push(buildRoute('spec', {
            id : this.props.project.id,
            specId
        }))
    }
    
    getSpecsByType() {
        const { specs, sections } = this.props.data;
        const sorted_ids = sortItemsByParam(specs, 'section_id');
        let list =[]

        if (!sorted_ids) return;

        sorted_ids.forEach((id, index) => {
            let section_name = specs[id].section_id && sections[specs[id].section_id].name;

            list.push(
                <a key={'timy-spec-list-item-'+id}
                   onClick={() => this.navigate(id)}
                   href="javascript:;"
                   className='list-group-item list-group-item-action justify-content-between'>
                    {specs[id].name}
                    <span className='badge badge-default badge-pill'>
                        { section_name }
                    </span>
                </a>
            );
        });

        return  <div className='list-group'>
                    { list }
                </div>;
    }
    
    getSpecsByLocation() {
        
    }
    
    getSpecsByName() {
        
    }
    
    render() {
        if (!this.props.project.id) return <div></div>;

        let spec_list;
        switch (this.state.view_mode) {
            case 'sections' : spec_list = this.getSpecsByType();break;
            case 'locations' : spec_list = this.getSpecsByLocation();break;
            default : spec_list = this.getSpecsByName();
        }

        return  <section className='Specs TinyList'>
                    <h3>Spec list</h3>
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