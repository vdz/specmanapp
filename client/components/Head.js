import React from 'react';
import { connect } from 'react-redux';

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
                    <section className='toolbar'>
                        <img className='logo' src='/images/arh-logo.png' />
                        <h4 className='title'>SpecMan</h4>
                        <div className='user'>
                            <div className="btn-group user-actions" role="group">
                                <button id="btnGroupDrop1" 
                                        type="button" 
                                        className="btn btn-secondary dropdown-toggle"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {user.first_name}
                                </button>
                                <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                    <a className="dropdown-item" href="#" onClick={this.signout}>Sign out</a>
                                </div>
                            </div>

                            <img className='avatar rounded-circle'
                                 src={user.avatar} />
                        </div>
                    </section>
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        user : state.user
    }
}

export default connect(mapStateToProps)(Head);


