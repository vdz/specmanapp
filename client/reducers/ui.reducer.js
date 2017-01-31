import {
    CLOSE_MODAL,
    SHOW_MODAL,
    SET_PRINT_MODE
} from '../actions/ui.actions.js';

export const default_state = {
    modal_opened : false,
    modal_context : {},
    print_mode : 'section'
};

export function reducer(state = default_state, action = {}) {

    switch (action.type) {
        case CLOSE_MODAL:
            return {
                ...state,
                modal_opened: false
            }

        case SHOW_MODAL : return {
            ...state,
            modal_opened : true,
            modal_context : action.context
        }

        case SET_PRINT_MODE : return {
            ...state,
            print_mode : action.mode
        }
    }

    return state;
}