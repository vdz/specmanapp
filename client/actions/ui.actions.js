export const CLOSE_MODAL = 'close modal';
export const SHOW_MODAL = 'show modal';

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
