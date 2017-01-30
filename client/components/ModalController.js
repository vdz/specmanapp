import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../actions/ui.actions.js';

export class ModalController extends React.Component {

    close() {
        this.props.closeModal();
    }

    action() {
        this.props.action()
        this.close();
    }

    getContent() {
        if (!this.props.name) return <span key="empty" />;

        return <p className="message">{this.props.message}</p>;
    }

    render() {
        const visibility = this.props.modal_opened ? '' : ' hidden';

        return  <section ref='modal'
                         className={`Modal ${visibility}`}>

            <div className='mask' onClick={()=>this.close()}></div>

            <section className='dialog'>
                { this.getContent() }
                <button className="btn cancel outline" onClick={()=>this.close()}>
                    Cancel
                </button>
                <button className="btn action" onClick={()=>this.action()}>
                    { this.props.label }
                </button>
            </section>
        </section>
    }
}

export function mapStateToProps(state) {
    return {
        modal_opened : state.ui.modal_opened,
        label : state.ui.modal_context.label,
        name : state.ui.modal_context.name,
        action : state.ui.modal_context.action,
        message : state.ui.modal_context.message
    }
}

export default connect(mapStateToProps, {
    closeModal
})(ModalController);