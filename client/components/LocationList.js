import React from 'react';
import { connect } from 'react-redux';

import { LocationListItem as ListItem } from './LocationListItem.js';
import { updateLocation as updateItem, deleteLocation as deleteItem } from '../actions/data.actions.js';
import { setLocation } from '../actions/current.actions.js';
import { buildRoute } from '../config/routes.js';
import { push } from 'react-router-redux';
import { sortItemsByParam } from '../helpers/utils.js';


export class SectionList extends React.Component {

    save(params) {
        if (!params || !params.id) return;
        this.props.updateItem(params);
    }

    ['delete'](id) {
        if (!id) return;
        this.props.deleteItem(id);
    }

    manage(id) {
        if (!id) return;
        this.props.setLocation(this.props.items[id]);

        const { current } = this.props;

        // if at the end of the cycle go to new spec, otherwise go to locations
        if (current.type.id) {
            this.props.push(buildRoute('new_spec', { id : current.project.id }));
        } else if (current.section.id) {
            this.props.push(buildRoute('types', {
                id : current.project.id,
                sectionId : current.section.id
            }));
        } else {
            this.props.push(buildRoute('sections', { id : current.project.id }));
        }
    }

    newSpec() {
        this.props.push(buildRoute('new_spec', { id : this.props.current.project.id }))
    }

    getItems() {
        const { items } = this.props;
        let result = [];
        const sorted_ids = sortItemsByParam(items, 'order');

        sorted_ids.map((id) => {
            result.push(<ListItem key={'location-item-' + id}
                                         update={(params) => this.save(params)}
                                         delete={(params) => this.delete(params)}
                                         manage={(params) => this.manage(params)}
                                         new_spec={(params) => this.newSpec(params)}
                                         item={items[id]} />)
        });
        return result;
    }
    
    render() {
        if (!this.props.items) return null;

        const list = this.getItems();

        return  <section className='LocationList'>
                    { list }
                </section>
    }

}

export function mapStateToProps(state) {
    return {
        items : state.data.locations,
        current : state.current
    }
}

export default connect(mapStateToProps, {
    updateItem,
    deleteItem,
    setLocation,
    push
})(SectionList);
