import * as actionType from './actionType';
import TOKENS from '../api/tokens.json';
import { _api } from '../api';
import URLS from '../api/urls';

const createParamsString = (params) => {
    let url = '';
    for (const param in params) {
        if (params[param] === 0 || params[param]) {
            url += `&${param}=${params[param]}`;
        }
    }
    return '?' + url.substring(1, url.length);
}

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
    dispatch({type: actionType.CLEAR_LOADER});
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