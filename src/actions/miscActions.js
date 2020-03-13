import * as actionType from './actionType';
import TOKENS from '../api/tokens.json';
import { _api } from '../api';
import URLS from '../api/urls';
import { createParamsString } from './../utils';

export const setHomepage = (isHomepage) => (dispatch) => {
    dispatch({type: actionType.SET_HOMEPAGE, payload: isHomepage});
}

export const getWeatherData = (params = {}) => async (dispatch) => {
    params['appid'] = TOKENS.currWeather;
    params['id'] = TOKENS.currWeatherAppId;
    const url = URLS.currWeather + createParamsString(params);
    let response = null;
    try {
        dispatch({type: actionType.SET_LOADER});
        response = await _api.get(url);
        dispatch({type: actionType.CLEAR_LOADER});
        console.log('response weather ::::', response.data);
        const { temp } = response.data && response.data.main;
        const { description } = response.data && response.data.weather[0];
        if (temp || description) {
            const tempC = (temp - 273.15).toFixed(2);
            const weatherData = (tempC ? tempC + '°C, ' : '') + (description ? description : '');
            // if (weatherData) {
            //     if (window.innerWidth > 768) {
            //         this.setState(prevState => ({ ...prevState, weatherData }));
            //     } else {
            //         this.props.setWeather(weatherData);
            //     }
            // }
            console.log('ACTION WEATHERDATA :', weatherData);
            dispatch({type: actionType.GET_WEATHER_TODAY, payload: weatherData});
        } else {
            dispatch({type: actionType.GET_WEATHER_TODAY, payload: ''});
        }
    } catch (e) {
        console.error(e);
        dispatch({type: actionType.CLEAR_LOADER});
    }
}

export const getLocation = () => async (dispatch) => {
    let location = {};
    try {
        dispatch({type: actionType.SET_LOADER});
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch({type: actionType.CLEAR_LOADER});
                location = {...(position && position.coords)};
                if (location) {
                    dispatch({type: actionType.GET_LOCATION, payload: {...location}});
                } else {
                    console.log('No location found.');
                }
            },
            (err) => {
                dispatch({type: actionType.CLEAR_LOADER});
                console.error('ERROR IN GEOLOCATION :', err);
            }
        );
    } catch (e) {
        dispatch({type: actionType.CLEAR_LOADER});
        console.log('CATCHED ERROR IN GEOLOCATION : ', e);
    }
}
