import { GET_LOCATION } from '../actions/actionType';

const initialState = {
    latitude: null,
    longitude: null
}

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_LOCATION: {
            return {
                ...state,
                latitude: (action.payload && action.payload.latitude) || null,
                longitude: (action.payload && action.payload.longitude) || null
            }
        }
        default: {
            return { ...state };
        }
    }
}