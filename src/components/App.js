import React from 'react';
import { connect } from 'react-redux';

import AppRoutes from './AppRoutes';
import history from '../history';
import { setHomepage, getWeatherData } from '../actions';

const getHourOfDay = (date) => {
    const hour = new Date(date).getHours();

    if (hour >= 6 && hour <= 10) {
        return 'morning';
    } else if (hour > 10 && hour <= 17) {
        return 'noon';
    } else if (hour > 17 && hour <= 19) {
        return 'evening';
    } else if (hour > 19) {
        return 'night';
    } else {
        return 'dark_night';
    }
}

class App extends React.Component {
    hourOfDay = getHourOfDay(new Date());

    // constructor(props) {
    //     super(props);
    //     this.state = { weatherData: null, isHomepage: false };
    // }

    componentDidMount() {
        if (history.location.pathname === '/') {
            // this.setState({isHomepage: true});
            this.props.setHomepage(true);
            this.props.getWeatherData();
        }
        history.listen(
            (location, action) => {
                console.log('HISTORY CHANGED : ', location);
                if (location.pathname === '/') {
                    // this.setState({isHomepage: true});
                    this.props.setHomepage(true);
                    this.props.getWeatherData();
                } else {
                    // this.setState({isHomepage: false});
                    this.props.setHomepage(false);
                }
            }
        );
    }

    getAppStyle = () => {
        // console.log('Checking background', this.state);
        if (this.props.weather.isHomepage) {
            return { background: `url('/images/${this.hourOfDay}.jpeg') center/cover no-repeat fixed` }
        } else {
            return {background: `linear-gradient(to top left, mediumseagreen, mediumseagreen)`}
        }
    }

    // setWeather = (weatherData) => {
    //     if (weatherData) {
    //         this.setState(prevState => ({ ...prevState, weatherData }));
    //     }
    // }

    render() {
        return (
            <div style={this.getAppStyle()}>
                <AppRoutes hourOfDay={this.hourOfDay} />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        weather: state.weather
    };
}

const mapDispatchToProps = {
    setHomepage,
    getWeatherData
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(App);