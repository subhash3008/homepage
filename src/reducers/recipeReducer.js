import { GET_RANDOM_RECIPE } from '../actions/actionType';

const initialState = {
    recipeList: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_RANDOM_RECIPE:
            // console.log('Reducer Get random recipe : ', state, action);
            return {
                ...state,
                recipeList: [...action.payload]
            }
        default:
            // console.log('INVALID ACTION', state, action);
            return { ...state };
    }
}