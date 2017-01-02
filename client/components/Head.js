import React from 'react';
import { connect } from 'react-redux';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';


export class Head extends React.Component {
    signout() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }

    render() {
        const { user } = this.props;

        return  <section className='Head'>
                    <div className='container'>
                        <section className='toolbar row my-0'>
                            <div className='col-md'>
                                <img className='logo w-100' src='/images/arh-logo.png' />
                            </div>
                            <h4 className='title col-md-6'>SpecMan</h4>
                            <div className='user col-md'>
                                <DropdownButton bsSize="small" title={user.first_name} id="dropdown-size-small">
                                    <MenuItem onSelect={this.signout}>Sign out</MenuItem>
                                </DropdownButton>
                                <img className='avatar rounded-circle'
                                     src={user.avatar} />
                            </div>
                        </section>
                    </div>
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(Head);


