import { reducer as user, default_state as user_default_state } from './user.reducer.js';
import { reducer as data, default_state as data_default_state } from './data.reducer.js';
import { reducer as current, default_state as current_default_state } from './current.reducer.js';
import { reducer as ui, default_state as ui_default_state } from './ui.reducer.js';

export const default_state = {
    user : user_default_state,
    data : data_default_state,
    current : current_default_state,
    ui : ui_default_state
};

export const appReducer =  {
    user,
    data,
    current,
    ui
};
