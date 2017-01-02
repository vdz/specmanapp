import React from 'react';
import { connect } from 'react-redux';

export class Projects extends React.Component {
    render() {
        return  <section className='Projects'>
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        projects : state.data.projects
    }
}

export default connect(mapStateToProps)(Projects);


