import { INTIAL_VIEW_POST, CLEAR_INTIAL_VIEW_POST } from '../constants'


// Modal to Report a Video
export const intialPostView = (postId,userId,location) => (dispatch) => {
    return dispatch({
        postId,
        userId,
        location,
        type: INTIAL_VIEW_POST
    })
}

export const clearIntialPostView = () => (dispatch) => {
    return dispatch({
        type: CLEAR_INTIAL_VIEW_POST
    })
}