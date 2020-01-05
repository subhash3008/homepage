import React from 'react';

import styles from './Header.module.scss';
import { getTimedColor } from '../../utils';
import { _api } from '../../api';
import urls from '../../api/urls';
import tokens from '../../api/tokens.json';

class Header extends React.Component {
    fontColor = getTimedColor(this.props.hourOfDay);
    boxShadow = `0 3px 6px rgba(207, 207, 207, .2)`;
    headerStyle = {
        color: this.fontColor
    }

    constructor(props) {
        super(props);
        this.state = { weatherData: null };
    }

    componentDidMount() {
        this.getWeatherData();
    }

    getWeatherData = async () => {
        const url = urls.currWeather + '&appid=' + tokens.currWeather;
        const response = await _api.get(url);
        console.log('response weather ::::', response);
        if (response.status === 200) {
            const { temp } = response.data && response.data.main;
            const { description } = response.data && response.data.weather[0];
            if (temp || description) {
                const tempC = (temp - 273.15).toFixed(2);
                const weatherData = (tempC ? tempC + '°C, ' : '') + (description ? description : '');
                if (weatherData) {
                    if (window.innerWidth > 768) {
                        this.setState(prevState => ({ ...prevState, weatherData }));
                    } else {
                        this.props.setWeather(weatherData);
                    }
                }
            }
        }
    }

    getHeaderStyle = () => {
        if (this.props.hourOfDay === 'morning' || this.props.hourOfDay === 'noon') {
            this.boxShadow = '0 3px 6px rgba(0, 0, 0, .2)';
        }
        return { ...this.headerStyle, boxShadow: this.boxShadow };
    }

    render() {
        return (
            <div className={styles.Header} style={this.getHeaderStyle()}>
                <div className={styles.Header__Title}>
                    Subhash Chandra
                </div>
                <div className={styles.Header__Temp}>
                    {this.state.weatherData}
                </div>
            </div>
        );
    }
}

export default Header;