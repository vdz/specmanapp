import React from 'react';
import ReactDOM from 'react-dom';

export class NewTypeCompact extends React.Component {

    save() {
        let name = this.refs.name,
            description = this.refs.description;

        if (!name.value) {
            const name_el = ReactDOM.findDOMNode(name);
            const group_el = ReactDOM.findDOMNode(this.refs.group);
            group_el.classList.add('has_danger');
            name_el.classList.add('form-control-danger');
            return;
        }

        this.props.save({
            name : name.value,
            description : description.value
        });

        this.props.cancel();
    }

    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.name).focus();
    }

    render() {
        return  <section className='NewTypeCompact container'>
                    <form>
                        <div className="form-group row">
                            <div className="offset-sm-2 col-sm-10">
                                <h3 className='display-6'>Create new location</h3>
                            </div>
                        </div>
                        <div ref='group'
                             className="form-group row">
                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                            <div className="col-sm-10">
                                <input type="text" 
                                       ref='name'
                                       className="form-control" id="inputName" placeholder="Type name" />
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