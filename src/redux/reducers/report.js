import { REMOVE_POST_FROM_UI,REMOVE_POSTID_FROM_REDUX } from '../constants'

const initialState = {
    postId: null,
}

export const report = (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_POST_FROM_UI:
            return {
                ...state,
                postId:action.postId,
            }
            case REMOVE_POSTID_FROM_REDUX:
                return {
                    ...state,
                    postId:null,
                }
        default:
            return state;
    }
}