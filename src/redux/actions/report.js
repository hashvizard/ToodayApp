import { REMOVE_POST_FROM_UI,REMOVE_POSTID_FROM_REDUX } from '../constants'

export const reportAndRemove = (postId) => (dispatch) => {
    return dispatch({
        postId,
        type: REMOVE_POST_FROM_UI
    })
}

export const reportNull = () => (dispatch) => {
    return dispatch({
        type: REMOVE_POSTID_FROM_REDUX
    })
}
