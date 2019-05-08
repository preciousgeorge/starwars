const { getCharacters, getCharacter } = require('./characters.service');
const { sortBy } = require('../../lib/sort');
const { toFeet } = require('../../lib/conversion');

const ASC = 1;
const DESC = 0;
const orderSet = { asc: ASC, desc: DESC };

const getCharacters = (sortval, order = 1, filter) => {
  return new Promise((resolve, reject) => {
    getCharacters()
      .then(data => {
        if (sortval.typeof !== 'undefined') {
          sortedData = sortBy(data, {
            prop: sortval,
            desc: orderSet[order]
          });
        }

        data.map(obj => {
          obj.height_in_feet = toFeet(obj.height);
          return obj;
        });
        if (filter.typeof !== 'undefined') {
          data.filter(obj => {
            if (obj.gender != filter) {
              data.pop(obj);
            }
          });
        }

        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  getCharacters
};
