import React from 'react';

import styles from './Homepage.module.scss';
import Clock from '../Clock/Clock';

const Homepage = (props) => {
    return (
        <div className={styles.Homepage}>
            <Clock hourOfDay={props.hourOfDay} />
        </div>
    );
}

export default Homepage;