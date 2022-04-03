import { SET_OPEN_STATE ,INTIAL_POST} from '../constants';

const initialState = {
    open: null,
    index: 0,
}


export const feedState = (state = initialState, action) => {
    switch (action.type) {
        case SET_OPEN_STATE:
            return {
                ...state,
                open: action.open
            }
        case INTIAL_POST:
            return {
                ...state,
                index: action.index
            }
        default:
            return state;
    }
}