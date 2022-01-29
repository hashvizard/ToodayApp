import { INTIAL_VIEW_POST,CLEAR_INTIAL_VIEW_POST } from '../constants';

const initialState = {
    postId: null,
    userId: null,
}
// 0 for report modal and 1 for block modal
export const initialPost = (state = initialState, action) => {
    switch (action.type) {
        case INTIAL_VIEW_POST:
            return {
                ...state,
                postId: action.postId,
                userId: action.userId,
            }
        case CLEAR_INTIAL_VIEW_POST:
            return initialState;
        default:
            return state;
    }
}