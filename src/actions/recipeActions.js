import * as actionType from './actionType';
import TOKENS from '../api/tokens.json';
import { _api } from '../api';
import URLS from '../api/urls';
import { createParamsString } from './../utils';

export const getRandomRecipeList = (params) => async (dispatch) => {
    params['apiKey'] = TOKENS.spoonacular;
    // console.log('random recipe api params : ', params);
    const url = URLS.randomRecipeSpoonacular + createParamsString(params);
    let response = null;
    dispatch({type: actionType.SET_LOADER});
    try {
        response = await _api.get(url);
        dispatch({type: actionType.CLEAR_LOADER});
        console.log('RESPONSE FOR RANDOM RECIPE : ', response.data);
        dispatch({type: actionType.GET_RANDOM_RECIPE, payload: response.data && response.data.recipes});
    } catch (e) {
        console.error(e);
        dispatch({type: actionType.CLEAR_LOADER});
    }
}

export const getRecipeInfoById = (id) => async (dispatch) => {
    const params = {
        apiKey: TOKENS.spoonacular,
        id: id
    };
    const url = (URLS.infoRecipeSpoonacular).replace('/:id/', `/${id}/`) + createParamsString(params);
    let response = null;
    dispatch({type: actionType.SET_LOADER});
    try {
        response = await _api.get(url);
        dispatch({type: actionType.CLEAR_LOADER});
        console.log('RESPONSE FOR ID RECIPE : ', id, response.data);
        dispatch({type: actionType.GET_RECIPE_BY_ID, payload: response.data && response.data});
    } catch (e) {
        console.error(e);
        dispatch({type: actionType.CLEAR_LOADER});
    }
}

export const saveToFavourites = (recipe) => async (dispatch) => {
    const url = URLS.recipeBaseURL + URLS.createPGRecipe;
    let response = null;
    dispatch({type: actionType.SET_LOADER});
    try {
        console.log('Saving Recipe to Favourites : ', {...recipe});
        response = await _api.post(url, { ...recipe });
        dispatch({type: actionType.CLEAR_LOADER});
        console.log('RESPONSE FOR FAVOURITE RECIPE SAVED :', response.data);
        dispatch({type: actionType.SAVE_RECIPE_TO_FAVOURITES, payload: response.data});
    } catch (e) {
        console.error(e);
        dispatch({type: actionType.CLEAR_LOADER});
    }
}