export const getTimedColor = (hourOfDay) => {
    if (hourOfDay === 'morning' || hourOfDay === 'noon') {
        return '#333';
    }
    return '#cfcfcf';
}

export const toNumberStr = (num) => {
    if (num && !isNaN(num)) {
        return (+num.toFixed()).toLocaleString('en-IN');
    }
    return num;
}