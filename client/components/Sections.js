import React from 'react';
import { connect } from 'react-redux';

export class Sections extends React.Component {
    render() {
        return  <section className='Sections'>
                </section>;
    }
}

export function mapStateToProps(state) {
    return {
        sections : state.data.sections
    }
}

export default connect(mapStateToProps)(Sections);


