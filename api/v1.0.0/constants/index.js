env = process.env.NODE_ENV;

console.log(env);
filePath = './' + env + '.json';
constants = require(filePath);

module.exports = constants;
