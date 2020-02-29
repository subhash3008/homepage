import React from 'react';

import AppRoutes from './AppRoutes';
import history from '../history';

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

    constructor(props) {
        super(props);
        this.state = { weatherData: null, isHomepage: false };
    }

    componentDidMount() {
        if (history.location.pathname === '/') {
            this.setState({isHomepage: true});
        }
        history.listen(
            (location, action) => {
                console.log('HISTORY CHANGED : ', location);
                if (location.pathname === '/') {
                    this.setState({isHomepage: true});
                } else {
                    this.setState({isHomepage: false});
                }
            }
        );
    }

    getAppStyle = () => {
        // console.log('Checking background', this.state);
        if (this.state.isHomepage) {
            return { background: `url('/images/${this.hourOfDay}.jpeg') center/cover no-repeat fixed` }
        } else {
            return {background: `linear-gradient(to top left, mediumseagreen, mediumseagreen)`}
        }
    }

    setWeather = (weatherData) => {
        if (weatherData) {
            this.setState(prevState => ({ ...prevState, weatherData }));
        }
    }

    render() {
        return (
            <div style={this.getAppStyle()}>
                <AppRoutes hourOfDay={this.hourOfDay} setWeather={this.setWeather} weatherData={this.state.weatherData} isHomepage={this.state.isHomepage}/>
            </div>
        );
    }

}

export default App;