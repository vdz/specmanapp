import React from 'react';
import { connect } from 'react-redux';

import { SectionListItem } from './SectionListItem.js';
import { updateSection, deleteSection } from '../actions/data.actions.js';
import { buildRoute } from '../config/routes.js';
import { push } from 'react-router-redux';

export class SectionList extends React.Component {

    save(params) {
        if (!params || !params.id) return;
        this.props.updateSection(params);
    }

    ['delete'](id) {
        if (!id) return;
        this.props.deleteSection(id);
    }

    manage(id) {
        if (!id) return;
        this.props.push(buildRoute('section', { id }))
    }
    
    getSectionItems() {
        const { sections } = this.props;
        let result = [];
        Object.keys(sections).map((id) => {
            result.push(<SectionListItem key={`section-item-${id}`}
                                         update={(params) => this.save(params)}
                                         delete={(params) => this.delete(params)}
                                         manage={(params) => this.manage(params)}
                                         section={sections[id]} />)
        });
        return result;
    }
    
    render() {
        if (!this.props.sections) return null;

        const section_list = this.getSectionItems();

        return  <section className='SectionList'>
                    { section_list }
                </section>
    }

}

export function mapStateToProps(state) {
    return {
        sections : state.data.sections
    }
}

export default connect(mapStateToProps, {
    updateSection,
    deleteSection,
    push
})(SectionList);
