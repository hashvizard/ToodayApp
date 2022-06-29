import { CLEAR_MODAL, REPORT_MODAL_OPEN } from '../constants'


// Modal to Report a Video
export const openReportModal = (open, data) => (dispatch) => {
    return dispatch({
        data,
        open,
        modalType: 0,
        type: REPORT_MODAL_OPEN
    })
}

export const clearModal = () => (dispatch) => {
    return dispatch({
        type: CLEAR_MODAL
    })
}