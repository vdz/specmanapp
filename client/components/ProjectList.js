import React from 'react';
import { connect } from 'react-redux';

import { ProjectListItem } from './ProjectListItem.js';

export class ProjectList extends React.Component {

    getProjectItems() {
        const { projects } = this.props;
        let result = [];
        Object.keys(projects).map((id) => {
            result.push(<ProjectListItem key={`project-item-${id}`} project={projects[id]} />)
        });
        return result;
    }
    
    render() {
        if (!this.props.projects) return null;

        const project_list = this.getProjectItems();

        return  <section className='ProjectList'>
                    { project_list }
                </section>
    }

}

export function mapStateToProps(state) {
    return {
        projects : state.data.projects
    }
}

export default connect(mapStateToProps)(ProjectList);
