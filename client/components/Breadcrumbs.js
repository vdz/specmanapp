import React from 'react';
import { connect } from 'react-redux';

import { buildRoute } from '../config/routes.js';
import { push } from 'react-router-redux';

export class Breadcrumbs extends React.Component {

    navigate(route) {
        this.props.push(route);
    }

    render() {
        const curr = this.props.current;
        const project_route = buildRoute('project', {
            id : curr.project.id
        });
        const section_route = buildRoute('section', {
            id : curr.project.id,
            sessionId : curr.section.id
        });

        const home = <a className="breadcrumb-item"
                        href="javascript:;"
                        onClick={()=>this.navigate(buildRoute('base'))}>Home</a>;
        const project = (!curr.project.id)
            ? <span className="breadcrumb-item active">Choose project</span>
            : <a className="breadcrumb-item"
                 href="javascript:;"
                 onClick={()=>this.navigate(buildRoute('base'))}>{curr.project.name}</a>;
        const section = (!curr.section.id)
            ? ''
            : <a className="breadcrumb-item"
                 href="javascript:;"
                 onClick={()=>this.navigate(project_route)}>{curr.section.name}</a>;
        const location = (!curr.location.id)
            ? ''
            : <a className="breadcrumb-item"
                 href="javascript:;"
                 onClick={()=>this.navigate(project_route)}>{curr.location.name}</a>;
        const type = (!curr.type.id)
            ? ''
            : <a className="breadcrumb-item"
                 href="javascript:;"
                 onClick={()=>this.navigate(section_route)}>{curr.type.name}</a>;

        return  <nav className="Breadcrumbs breadcrumb">
                    { home }
                    { project }
                    { section }
                    { type }
                    { location }
                </nav>
    }

}

export function mapStateToProps(state) {
    return {
        current : state.current
    }
}

export default connect(mapStateToProps, {
    push
})(Breadcrumbs);
