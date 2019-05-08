const { fetchCharacters } = require('./characters.service');
const { sortBy } = require('../../lib/sort');
const { toFeet } = require('../../lib/conversion');

const ASC = 0;
const DESC = 1;
const orderSet = { asc: ASC, desc: DESC };

/**
 *
 * @param {array} arr
 * @returns array
 */
const addTotalHeight = arr => {
  lenArr = arr.length;
  totalHeight = 0;
  for (let i = 0; i < lenArr; i++) {
    totalHeight += parseInt(arr[i]['height']);
  }
  arr.push({
    total_height_cm: totalHeight + 'cm',
    total_height_feet: toFeet(totalHeight)
  });

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
  for (let i = 0; i < lenArr; i++) {
    totalChar += 1;
  }
  arr.push({
    total_characters: totalChar
  });

  return arr;
};

const getCharacters = (sortval, order, filter) => {
  return new Promise((resolve, reject) => {
    fetchCharacters()
      .then(data => {
        result = data.results;
        console.log();
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
  getCharacters
};
