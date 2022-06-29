import { SET_OPEN_STATE, INTIAL_POST, ACTIVE_FEED_STATE } from '../constants';

const initialState = {
    open: 'BOTTOM',
    index: 0,
    active: 'feed'
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
        case ACTIVE_FEED_STATE:
            return {
                ...state,
                active: action.active
            }
        default:
            return state;
    }
}