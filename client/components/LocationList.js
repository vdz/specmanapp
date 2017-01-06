import React from 'react';
import { connect } from 'react-redux';

import { LocationListItem as ListItem } from './LocationListItem.js';
import { updateLocation as updateItem, deleteLocation as deleteItem } from '../actions/data.actions.js';
import { setLocation } from '../actions/current.actions.js';
import { push } from 'react-router-redux';

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
    }
    
    getItems() {
        const { items } = this.props;
        let result = [];
        Object.keys(items).map((id) => {
            result.push(<ListItem key={'location-item-' + id}
                                         update={(params) => this.save(params)}
                                         delete={(params) => this.delete(params)}
                                         manage={(params) => this.manage(params)}
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
        items : state.data.locations
    }
}

export default connect(mapStateToProps, {
    updateItem,
    deleteItem,
    setLocation,
    push
})(SectionList);
