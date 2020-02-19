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
        this.state = { weatherData: null, isMenuOpen: false };
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

    onMenuBtnClick = () => {
        this.setState({isMenuOpen: !this.state.isMenuOpen}, () => {
            console.log('menu state : ', this.state.isMenuOpen ? 'open' : 'closed');
        });
    }

    onOverlayClose = () => {
        this.setState({isMenuOpen: false});
    }

    getHeaderStyle = () => {
        if (this.props.hourOfDay === 'morning' || this.props.hourOfDay === 'noon') {
            this.boxShadow = '0 3px 6px rgba(0, 0, 0, .2)';
        }
        return { ...this.headerStyle, boxShadow: this.boxShadow };
    }

    getMenuIconSrc() {
        switch (this.props.hourOfDay) {
            case 'morning': 
            case 'noon':
            case 'evening':
                return '/images/list.png';
            case 'night':
            case 'dark_night':
                return '/images/list-white.png';
            default:
                return '/images/list.png';
        }
    }

    renderMenu = () => {
        return (
            <React.Fragment>
                <div className={styles.Overlay}>
                    <div className={styles.Overlay__Close} onClick={this.onOverlayClose}>
                        <img src="/images/cancel.svg" alt="close menu"></img>
                    </div>
                </div>
                <div className={styles.Menu}>
                    <div className={styles.Menu__Heading}>
                        Menu
                    </div>
                    <div className={styles.Menu__Content}>
                        <ul className={styles.Menu__Content__List}>
                            <li className={styles.Menu__Content__List__Item}>
                                <span>Home A</span>
                            </li>
                            <li className={styles.Menu__Content__List__Item}>
                                <span>Jokes</span>
                            </li>
                            <li className={styles.Menu__Content__List__Item}>
                                <span>Jokes</span>
                            </li>
                            <li className={styles.Menu__Content__List__Item}>
                                <span>Jokes</span>
                            </li>
                            <li className={styles.Menu__Content__List__Item}>
                                <span>Jokes</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className={styles.Header} style={this.getHeaderStyle()}>
                    <div className={styles.Header__Title}>
                        Subhash Chandra
                    </div>
                    <div className={styles.Header__Temp}>
                        {this.state.weatherData}
                    </div>
                    <div className={styles.Header__Menu__Btn} onClick={this.onMenuBtnClick}>
                        <span><img src={this.getMenuIconSrc()} alt="toggle menu"></img></span>
                    </div>
                </div>
                {this.state.isMenuOpen ? this.renderMenu() : null}
            </React.Fragment>
        );
    }
}

export default Header;