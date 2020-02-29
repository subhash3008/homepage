import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import loaderReducer from './loaderReducer';

export default combineReducers({
    recipe: recipeReducer,
    loading: loaderReducer
});