import React from 'react';

const App = React.createClass({
    render : function render() {
        return (
            <section className='app-container'>
                { this.props.children }
            </section>
            );
    }
});

export default App;