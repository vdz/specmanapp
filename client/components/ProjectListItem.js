import React from 'react';

export class ProjectListItem extends React.Component {
    render() {
        const { project } = this.props;
        return  <section className='ProjectListItem row'>
                    <div className='col-md-4'>
                        <h6>{project.name}</h6>
                        <p>
                            {project.address}<br />
                            <small>{project.client}</small>
                        </p>
                    </div>
                    <div className='col-md description uncoverme'>
                        <p><small>{project.description}</small></p>
                    </div>
                    <div className='col-md-3 controls uncoverme'>
                        <button className='btn btn-primary'>
                            Manage
                        </button>
                        <button className='btn btn-link text-danger'>
                            <i className="fa fa-times fa-4" aria-hidden="true"></i>&nbsp;
                            Delete
                        </button>
                    </div>
                </section>;
    }
}