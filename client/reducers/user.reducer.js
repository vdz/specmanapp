import { SET_USER_PROFILE } from  '../actions/user.actions.js';

export const default_state = {
    user : {
        first_name : '',
        last_name : '',
        full_name : '',
        avatar : '',
        email : '',
        id_token : ''
    }
};

export function reducer(state = default_state, action) {
    switch (action.type) {
        case SET_USER_PROFILE: return {
            ...state,
            ...action.profile
        }
    }

    return state;
}