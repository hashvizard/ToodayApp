import { REMOVE_BLOCK_USER_LOADED_POST,REMOVE_BLOCK_USERS_FROM_REDUX } from '../constants'

const initialState = {
    userId: null,
}

export const blockedUserPost = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_BLOCK_USER_LOADED_POST:
            return {
                ...state,
                userId:action.userId,
            }
            case REMOVE_BLOCK_USERS_FROM_REDUX:
                return {
                    ...state,
                    userId:null,
                }
        default:
            return state;
    }
}