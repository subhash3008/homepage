// import * as actionType from './actionType';
// import TOKENS from '../api/tokens.json';
// import { _api } from '../api';
// import URLS from '../api/urls';
// import { createParamsString } from './../utils';
import * as miscActions from './miscActions';
import * as recipeActions from './recipeActions';

export const setHomepage = miscActions.setHomepage;
export const getWeatherData = miscActions.getWeatherData;
export const getRandomRecipeList = recipeActions.getRandomRecipeList;
export const getRecipeInfoById = recipeActions.getRecipeInfoById;
export const saveToFavourites = recipeActions.saveToFavourites;