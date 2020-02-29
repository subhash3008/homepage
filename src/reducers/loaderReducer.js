import {
    SET_LOADER,
    CLEAR_LOADER
} from '../actions/actionType';

const initialState = {
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADER: {
            console.log('Setting Loader', action);
            return {...state, loading: true};
        }
        case CLEAR_LOADER: {
            console.log('Clearing Loader', action);
            return {...state, loading: false};
        }
        default: {
            return {...state};
        }
    }
}