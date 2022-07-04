import { USER_STATE_CHANGE,CHECK_FOR_UPDATES } from '../constants'

const initialState = {
    currentUser: null,
    loaded: false,
    updates:true
}

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case USER_STATE_CHANGE:
            return {
                ...state,
                currentUser: action.currentUser,
                loaded: action.loaded
            }
        case CHECK_FOR_UPDATES:
            return {
                ...state,
                updates: action.updates
            }
        default:
            return state;
    }
}