import { BLOCK_USER_MODAL, CLEAR_BLOCK_MODAL } from '../constants'


// Modal to Block a user
export const openBlockModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        type: BLOCK_USER_MODAL
    })
}

export const clearBlockModal = () => (dispatch) => {
    return dispatch({
        type: CLEAR_BLOCK_MODAL
    })
}