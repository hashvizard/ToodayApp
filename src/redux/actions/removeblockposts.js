import { REMOVE_BLOCK_USER_LOADED_POST,REMOVE_BLOCK_USERS_FROM_REDUX } from '../constants'

export const blockAndRemove = (userId) => (dispatch) => {
    return dispatch({
        userId,
        type: REMOVE_BLOCK_USER_LOADED_POST
    })
}

export const blockNull = () => (dispatch) => {
    return dispatch({
        type: REMOVE_BLOCK_USERS_FROM_REDUX
    })
}
