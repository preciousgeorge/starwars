function toFeet(cm) {
  var realFeet = (cm * 0.3937) / 12;
  var feet = Math.floor(realFeet);
  var inches = Math.ceil((realFeet - feet) * 12 * 100) / 100;
  return feet + 'ft and ' + inches + ' inches';
}

module.exports = {
  toFeet
};
