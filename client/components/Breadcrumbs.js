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
        const sections_route = buildRoute('sections', {
            id : curr.project.id
        });
        const section_route = buildRoute('section', {
            id : curr.project.id,
            sessionId : curr.section.id
        });
        const locations_route = buildRoute('locations', {
            id : curr.project.id
        });
        const spec_route = buildRoute('new_spec', {
            id : curr.project.id
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
            ? <span className='breadcrumb-item'>
                <button type="button"
                      onClick={()=>this.navigate(sections_route)}
                      className="btn btn-secondary btn-sm">Choose section</button>
              </span>
            : <a className="breadcrumb-item"
                 href="javascript:;"
                 onClick={()=>this.navigate(sections_route)}>{curr.section.name}</a>;

        const location = (!curr.location.id)
            ? <span className='breadcrumb-item'>
                <button type="button"
                      onClick={()=>this.navigate(locations_route)}
                      className="btn btn-secondary btn-sm">Choose location</button>
              </span>
            : <a className="breadcrumb-item"
                 href="javascript:;"
                 onClick={()=>this.navigate(locations_route)}>{curr.location.name}</a>;

        const type = (!curr.type.id)
            ? <span className='breadcrumb-item'>
                <button type="button"
                        onClick={()=>this.navigate(section_route)}
                        className="btn btn-secondary btn-sm">Choose type</button>
              </span>
            : <a className="breadcrumb-item"
                 href="javascript:;"
                 onClick={()=>this.navigate(section_route)}>{curr.type.name}</a>;

        const spec =<span className='breadcrumb-item'>
                        <button type="button"
                                onClick={()=>this.navigate(spec_route)}
                                className="btn btn-primary btn-sm">New spec</button>
                    </span>;

        return  <nav className="Breadcrumbs breadcrumb">
                    { home }
                    { project }
                    { (curr.project.id) ? section : ''}
                    { (curr.section.id) ? type : ''}
                    { (curr.project.id) ? location : ''}
                    { (curr.project.id) ? spec : '' }
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
