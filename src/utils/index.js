export const getTimedColor = (hourOfDay) => {
    if (hourOfDay === 'morning' || hourOfDay === 'noon') {
        return '#333';
    }
    return '#cfcfcf';
}