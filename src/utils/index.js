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

export const createParamsString = (params) => {
    let url = '';
    for (const param in params) {
        if (params[param] === 0 || params[param]) {
            url += `&${param}=${params[param]}`;
        }
    }
    return '?' + url.substring(1, url.length);
}