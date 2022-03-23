import { CREATE_TOKEN } from '../constants'

const initialState = {
    token: null
}

export const token = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TOKEN:
            return {
                ...state,
                token: action.token
            }
        default:
            return state;
    }
}