import React from 'react';
import { connect } from 'react-redux';

import { SectionListItem as ListItem } from './SectionListItem.js';
import { updateSection as updateItem, deleteSection as deleteItem } from '../actions/data.actions.js';
import { buildRoute } from '../config/routes.js';
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
        this.props.push(buildRoute('section', {
            id : this.props.project.id,
            sectionId : id
        }));
    }

    newSpec() {
        this.props.push(buildRoute('new_spec', { id : this.props.project.id }))
    }

    getItems() {
        const { items } = this.props;
        let result = [];
        Object.keys(items).map((id) => {
            result.push(<ListItem key={`section-item-${id}`}
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

        return  <section className='SectionList'>
                    { list }
                </section>
    }

}

export function mapStateToProps(state) {
    return {
        project : state.current.project,
        items : state.data.sections
    }
}

export default connect(mapStateToProps, {
    updateItem,
    deleteItem,
    push
})(SectionList);
