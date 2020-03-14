import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form';

import recipeReducer from './recipeReducer';
import loaderReducer from './loaderReducer';
import weatherReducer from './weatherReducer';

export default combineReducers({
    recipe: recipeReducer,
    loading: loaderReducer,
    weather: weatherReducer,
    form: formReducer
});