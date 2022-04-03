import { SET_OPEN_STATE,INTIAL_POST } from '../constants'


// Modal to Report a Video
export const setFeedState = (open) => (dispatch) => {
    return dispatch({
        open:open,
        type: SET_OPEN_STATE
    })
}

// Set intial Post
export const setIntialPost = (index) => (dispatch) => {
    return dispatch({
        index:index,
        type: INTIAL_POST
    })
}