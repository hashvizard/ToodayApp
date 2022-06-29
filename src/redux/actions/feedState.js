import { SET_OPEN_STATE,INTIAL_POST,ACTIVE_FEED_STATE } from '../constants'


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

// Set Active Feed State
export const activeFeedState = (type) => (dispatch) => {
    return dispatch({
        active:type,
        type: ACTIVE_FEED_STATE
    })
}