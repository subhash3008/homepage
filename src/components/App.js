import React from 'react';

import AppRoutes from './AppRoutes';

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
        this.state = { weatherData: null };
    }

    getAppStyle = () => {
        return { background: `url('/images/${this.hourOfDay}.jpeg') center/cover no-repeat fixed` }
    }

    setWeather = (weatherData) => {
        if (weatherData) {
            this.setState(prevState => ({ ...prevState, weatherData }));
        }
    }

    render() {
        return (
            <div style={this.getAppStyle()}>
                <AppRoutes hourOfDay={this.hourOfDay} setWeather={this.setWeather} weatherData={this.state.weatherData}/>
            </div>
        );
    }

}

export default App;