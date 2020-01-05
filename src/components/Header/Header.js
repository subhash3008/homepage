import React from 'react';

import styles from './Header.module.scss';

const Header = (props) => {
    let fontColor = '#cfcfcf';
    let boxShadow = `0 3px 6px rgba(0, 0, 0, .5)`
    if (props.hourOfDay === 'morning' || props.hourOfDay === 'noon') {
        fontColor = '#333';
        boxShadow = '0 3px 6px rgba(0,0,0,.2)';
    }
    const headerStyle = {
        color: fontColor,
        boxShadow
    }
    return (
        <div className={styles.Header} style={headerStyle}>
            <div className={styles.Header__Title}>
                Subhash Chandra
            </div>
            <div>&nbsp;</div>
        </div>
    );
}

export default Header;