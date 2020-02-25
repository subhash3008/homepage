import { 
    GET_RANDOM_RECIPE, 
    GET_RECIPE_BY_ID 
} from '../actions/actionType';

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
        case GET_RECIPE_BY_ID:
            return {
                ...state,
                recipeList: [...state.recipeList, action.payload]
            }
        default:
            // console.log('INVALID ACTION', state, action);
            return { ...state };
    }
}