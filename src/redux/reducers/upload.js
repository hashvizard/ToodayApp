import { UPLOADED,UPLOADING_POST } from '../constants'

const initialState = {
    description: null,
    location: null,
    video:null,
    thumbnail:null
}

export const upload = (state = initialState, action) => {
    switch (action.type) {
        case UPLOADING_POST:
            return {
                ...state,
                description: action.description,
                location: action.location,
                thumbnail: action.thumbnail,
                video: action.video
            }
        case UPLOADED:
            return {
                ...state,
                description: null,
                location: null,
                thumbnail: null,
                video: null
            }
        default:
            return state;
    }
}