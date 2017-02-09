import React from 'react';
import { connect } from 'react-redux';

import { ProjectListItem } from './ProjectListItem.js';
import { updateProject, deleteProject } from '../actions/data.actions.js';
import { buildRoute } from '../config/routes.js';
import { push } from 'react-router-redux';

export class ProjectList extends React.Component {

    save(params) {
        if (!params || !params.id) return;
        this.props.updateProject(params);
    }

    ['delete'](id) {
        if (!id) return;
        this.props.deleteProject(id);
    }

    manage(id) {
        if (!id) return;
        this.props.push(buildRoute('sections', {
            id
        }))
    }

    print(id) {
        document.location.href = buildRoute('booklet', {
            id
        });
    }

    getProjectItems() {
        const { projects } = this.props;
        let result = [];
        Object.keys(projects).map((id) => {
            result.push(<ProjectListItem key={`project-item-${id}`}
                                         update={(params) => this.save(params)}
                                         delete={(params) => this.delete(params)}
                                         manage={(params) => this.manage(params)}
                                         print={(params) => this.print(params)}
                                         project={projects[id]} />)
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

export default connect(mapStateToProps, {
    updateProject,
    deleteProject,
    push
})(ProjectList);
