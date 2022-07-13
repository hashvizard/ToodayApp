import { UPLOADED,UPLOADING_POST } from '../constants'

const initialState = {
    description: null,
    location: null,
    video:null
}

export const upload = (state = initialState, action) => {
    switch (action.type) {
        case UPLOADING_POST:
            return {
                ...state,
                description: action.description,
                location: action.location,
                video: action.video
            }
        case UPLOADED:
            return {
                ...state,
                description: null,
                location: null,
                video: null
            }
        default:
            return state;
    }
}