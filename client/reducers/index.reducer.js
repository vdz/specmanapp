import { reducer as userReducer, default_state as user_default_state } from './user.reducer.js';
import { reducer as dataReducer, default_state as data_default_state } from './data.reducer.js';
import { reducer as currentReducer, default_state as current_default_state } from './current.reducer.js';

export const default_state = {
    user : user_default_state,
    data : data_default_state,
    current : current_default_state
    //ui : {}
};

export const appReducer =  {
    user : userReducer,
    data : dataReducer,
    current : currentReducer
};
