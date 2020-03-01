import {
    GET_WEATHER_TODAY,
    SET_HOMEPAGE
} from '../actions/actionType';

const initialState = {
    isHomepage: false,
    weatherData: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_WEATHER_TODAY: {
            return {...state, weatherData: action.payload};
        }
        case SET_HOMEPAGE: {
            return {...state, isHomepage: action.payload};
        }
        default: {
            return {...state};
        }
    }
}