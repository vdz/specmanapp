import React from 'react';
import { connect } from 'react-redux';

import { NewProjectCompact } from '../components/NewProjectCompact.js';
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
                      className="btn btn-secondary btn-lg"
                      onClick={() => this.toggleNewForm()}>
                <i className="fa fa-plus fa-3" aria-hidden="true"></i>&nbsp;
                New project
            </button>;

        return  <section className='Projects'>
                    <header className='welcome'>
                        <h1 className='desplay-2'>SpecMan</h1>
                        <p className='lead'>Managing construstion specifications for Regal American Homes</p>
                    </header>
                    <section className='data-wrapper'>
                        <h3>
                            Projects&nbsp;
                            <small className="text-muted">Create and manage your projects here</small>
                        </h3>
                        <p>Search filter here</p>
                        <section>
                            Project list here
                        </section>

                        { new_project }

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


