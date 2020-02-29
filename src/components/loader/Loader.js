import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => {
    return (
        <React.Fragment>
            <div className={styles.Overlay}></div>
            <div className={styles.Loader}></div>
        </React.Fragment>
    );
}

export default Loader;