import { BLOCK_USER_MODAL,CLEAR_BLOCK_MODAL } from '../constants';

const initialState = {
    open: false,
    data: null,
}
// 0 for report modal and 1 for block modal
export const block = (state = initialState, action) => {
    switch (action.type) {
        case BLOCK_USER_MODAL:
            return {
                ...state,
                open: action.open,
                data: action.data,
            }
        case CLEAR_BLOCK_MODAL:
            return initialState;
        default:
            return state;
    }
}