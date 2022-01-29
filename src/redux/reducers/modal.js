import { CLEAR_MODAL,REPORT_MODAL_OPEN } from '../constants';

const initialState = {
    open: false,
    data: null,
    modalType: -1,
}
// 0 for report modal and 1 for block modal
export const modal = (state = initialState, action) => {
    switch (action.type) {
        case REPORT_MODAL_OPEN:
            return {
                ...state,
                open: action.open,
                data: action.data,
                modalType: action.modalType,
            }
        case CLEAR_MODAL:
            return initialState;
        default:
            return state;
    }
}