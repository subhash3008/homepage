import React from 'react';

import styles from './Countries.module.scss';
import COUNTRIES from './Countries.data.json';

const Countries = () => {
    let countriesArr = Object.keys(COUNTRIES).map(el => {
        return {...COUNTRIES[el]};
    });

    countriesArr = countriesArr.sort((keyA, keyB) => {
        return keyA.Name.localeCompare(keyB.Name);
    });

    console.log('COUNTRIES : ', countriesArr);
    const renderCountries = () => {
        return countriesArr.map(el => {
            const capital = el.Capital && el.Capital.Name;
            return (
                <tr key={el.Name}>
                    <td>{el.Name}</td>
                    <td>{capital}</td>
                    <td>
                        <a href={el.CountryInfo} target="_blank">Know More</a>
                    </td>
                </tr>
            )
        });
    }
    return (
        <div className={styles.Countries}>
            <table style={{width: '100%'}}>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Capital</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCountries()}
                </tbody>
            </table>
        </div>
    );
}

export default Countries;