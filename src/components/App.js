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

const App = () => {
    const hourOfDay = getHourOfDay(new Date());
    const appStyle = {
        background: `url('/images/${hourOfDay}.jpeg') center/cover no-repeat fixed`
    }
    return (
        <div style={appStyle}>
            <AppRoutes hourOfDay={hourOfDay} />
        </div>
    );
}

export default App;