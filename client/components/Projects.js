import React from 'react';
import { connect } from 'react-redux';

import { NewProjectCompact } from './NewProjectCompact.js';
import ProjectList from './ProjectList.js';
import { createProject } from '../actions/data.actions.js';

export class Projects extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            show_new_form : false
        }
    }

    newProject(params) {
        console.log(params);
        this.props.createProject(params);
    }

    toggleNewForm() {
        this.setState({
            show_new_form : !this.state.show_new_form
        });
    }

    render() {
        const new_project = (this.state.show_new_form)
            ? <NewProjectCompact save={(params) => this.newProject(params)} cancel={() => this.toggleNewForm()} />
            : <button type="button"
                      className="btn btn-secondary"
                      onClick={() => this.toggleNewForm()}>
                <i className="fa fa-plus fa-2" aria-hidden="true"></i>&nbsp;
                New project
            </button>;

        return  <section className='Projects container'>
                    <header className='welcome row'>
                        <div className='col-md'>
                            <h1 className='display-2'>SpecMan</h1>
                            <p className='lead'>Managing construstion specifications for Regal American Homes</p>
                        </div>
                    </header>
                    <section className='data-wrapper'>
                        <div className='row'>
                            <h3 className='col-md'>
                                Projects
                            </h3>
                            <p className='col-md text-muted'>
                                Create and manage your projects here
                            </p>
                        </div>
                        <div className='row'>
                            <p className='col-md'>
                                Search filter here
                            </p>
                        </div>

                        <ProjectList />

                        <div className='row'>
                            <div className='col-md py-1'>
                                { new_project }
                            </div>
                        </div>
                    </section>
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        projects : state.data.projects
    }
}

export default connect(mapStateToProps, {
    createProject
})(Projects);


