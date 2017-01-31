export const CLOSE_MODAL = 'close modal';
export const SHOW_MODAL = 'show modal';
export const SET_PRINT_MODE = 'set print mode';

export function closeModal(){
    return {
        type: CLOSE_MODAL
    };
}

export function showModal(context){
    return {
        type: SHOW_MODAL,
        context
    };
}

export function setPrintMode(mode){
    return {
        type: SET_PRINT_MODE,
        mode
    };
}
