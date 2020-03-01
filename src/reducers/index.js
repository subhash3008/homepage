import { combineReducers } from 'redux';
import recipeReducer from './recipeReducer';
import loaderReducer from './loaderReducer';
import weatherReducer from './weatherReducer';

export default combineReducers({
    recipe: recipeReducer,
    loading: loaderReducer,
    weather: weatherReducer
});