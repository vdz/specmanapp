import React from 'react';
import ReactDOM from 'react-dom';

export class NewProjectCompact extends React.Component {

    save() {
        let name = this.refs.name,
            description = this.refs.description,
            client = this.refs.client,
            address = this.refs.address;

        if (!name.value) {
            const name_el = ReactDOM.findDOMNode(name);
            const group_el = ReactDOM.findDOMNode(this.refs.group);
            group_el.classList.add('has_danger');
            name_el.classList.add('form-control-danger');
            return;
        }

        this.props.save({
            name : name.value,
            description : description.value,
            client : client.value,
            address : address.value
        });

        this.props.cancel();
    }
    
    render() {
        return  <section className='NewProjectCompact container'>
                    <form>
                        <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                                <h3 className='display-6'>Create new project</h3>
                            </div>
                        </div>
                        <div ref='group'
                             className="form-group row">
                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" 
                                       ref='name'
                                       className="form-control" id="inputName" placeholder="Project name" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       ref="description"
                                       className="form-control" id="inputDescription" placeholder="Description" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputClient" className="col-sm-2 col-form-label">Client info</label>
                            <div className="col-sm-10">
                                <input type="text" 
                                       ref="client"
                                       className="form-control" id="inputClient" placeholder="Client info" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="inputAddress" className="col-sm-2 col-form-label">Address</label>
                            <div className="col-sm-10">
                                <input type="text"
                                       ref="address"
                                       className="form-control" id="inputAddress" placeholder="Address" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                                <button type="button" 
                                        onClick={() => this.save()}
                                        className="btn btn-primary">Create new</button>
                                &nbsp;
                                <button type="button"
                                        onClick={this.props.cancel}
                                        className="btn btn-secondary">Cancel</button>
                            </div>
                        </div>
                    </form>
                </section>;
    }

}