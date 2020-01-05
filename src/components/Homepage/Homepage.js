import React from 'react';

import styles from './Homepage.module.scss';
import Clock from '../Clock/Clock';
import { getTimedColor } from '../../utils';

const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const days = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
];

const formatDate = (d) => {
    const date = new Date(d);
    return days[date.getDay()] + ', ' +
        date.getDate() + ' ' +
        months[date.getMonth()] + ' ' +
        date.getFullYear();
}

const Homepage = (props) => {
    const dateColor = getTimedColor(props.hourOfDay);
    const dateStr = formatDate(new Date());
    return (
        <div className={styles.Homepage}>
            <Clock hourOfDay={props.hourOfDay} />
            <div className={styles.Homepage__Date} style={{color: dateColor}}>
                {dateStr}
            </div>
            {
                props.weatherData ? 
                    <div className={styles.Homepage__Temp} style={{color: dateColor}}>
                        {props.weatherData}
                    </div> :
                    null
            }
        </div>
    );
}

export default Homepage;