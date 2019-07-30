let { toFeet } = require('./conversion');

/**
 * parse a url string and get the movie id from it
 * @param {string} url
 */
const getMovieIdFromUrl = url => {
    arr = url.split('/');
    return parseInt(arr[arr.length - 2]);
};

const getIdsFromMovieUrls = data => {
    len = data.length;
    ids = [];
    for (let i = 0; i < len; i++) {
        ids.push(getMovieIdFromUrl(data[i]));
    }
    return ids;
};

/**
 * Check if string count is valid
 * @param {string} str
 */
const isStrCountValid = str => {
    if (str.length <= 500) {
        return true;
    }
    return false;
};

/**
 *
 * @param {array} arr
 * @returns array
 */
const addTotalHeight = arr => {
    lenArr = arr.length;
    _total_height = {}
    totalHeight = 0;
    for (let i = 0; i < lenArr; i++) {
        totalHeight += parseInt(arr[i]['height']);
    }
    _total_height['_total_height'] = {
        total_height_cm: totalHeight + 'cm',
        total_height_feet: toFeet(totalHeight)
    }
    arr.push(_total_height);

    return arr;
};

/**
 *
 * @param {array} arr
 * @returns array
 */
const totalCharacters = arr => {
    lenArr = arr.length;
    totalChar = 0;
    _total_characters = {}

    for (let i = 0; i < lenArr; i++) {
        totalChar += 1;
    }
    _total_characters['_total_characters'] = totalChar

    arr.push(_total_characters);

    return arr;
};

const errorMessage = {
    message: 'Sorry Anakin Skywalker, there is no light to be found on the Dark side'
};

/**
 * 
 * @param  data 
 * @param prop 
 * @param _filter 
 */
const filterByProp = (data, prop, _filter) => {
    return data.filter(dat => {
        return dat[prop] == _filter;
    });
};


/**
 * Check if give argument is a integer
 * @param value
 * @returns boolean 
 */
const validateIdInteger = value => {
    return !isNaN(value) &&
        parseInt(Number(value)) == value &&
        !isNaN(parseInt(value, 10));
}


/**
 * get the last ip address in the array
 * @param {array} _headers 
 * @returns string
 */
const getLastIp = _headers => {
    let _list = _headers.split(",")
    return ipAddress = _list[_list.length - 1];
}

/**
 * get request header of return false
 * @param {array} requestObj 
 */
const getRequestHeaders = requestObj => {
    if (typeof requestObj.headers != undefined) {
        return requestObj.headers["x-forward-for"] || false
    }
    return false

}

/**
 * get ip address from request object
 * @param {object} requestObj 
 * @returns string | boolean
 */
const getUserIp = requestObj => {
    if (typeof requestObj.connection == undefined) {
        return false;
    }
    if (ip = getRequestHeaders(requestObj)) {
        return ip
    }
    return requestObj.connection.remoteAddress;
}

module.exports = {
    getMovieIdFromUrl,
    isStrCountValid,
    getIdsFromMovieUrls,
    addTotalHeight,
    totalCharacters,
    errorMessage,
    filterByProp,
    validateIdInteger,
    getLastIp,
    getRequestHeaders,
    getUserIp
};