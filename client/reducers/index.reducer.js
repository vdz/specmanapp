import { reducer as userReducer, default_state as user_default_state } from './user.reducer.js';

export const default_state = {
    user : user_default_state,
    /*data : {
        projects : {},
        sections : {},
        types : {},
        locations : {},
        specs : {}
    },
    current : {
        project : {},
        spec : {},
        section : {},
        type : {},
        location : {}
    },
    ui : {}*/
};

export const appReducer =  {
    user : userReducer
};
