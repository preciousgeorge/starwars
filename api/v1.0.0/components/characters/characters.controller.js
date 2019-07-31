const { fetchCharacters } = require('./characters.service');
const { sortBy } = require('../../lib/sort');
const { addTotalHeight, totalCharacters } = require('../../lib/functions');

const ASC = 0;
const DESC = 1;
const orderSet = { asc: ASC, desc: DESC };

const getCharacters = (sortval, order, filter) => {
    return new Promise((resolve, reject) => {
        fetchCharacters()
            .then(data => {
                result = data.results;
                if (sortval) {
                    order = order || 1;
                    result = sortBy(result, {
                        prop: sortval,
                        desc: orderSet[order]
                    });
                }
                if (filter) {
                    result = result.filter(obj => {
                        return obj.gender == filter;
                    });
                }
                result = addTotalHeight(result);
                result = totalCharacters(result);

                resolve(result);
            })
            .catch(err => {
                reject(err);
            });
    });
};

module.exports = {
    addTotalHeight,
    getCharacters,
    totalCharacters
};