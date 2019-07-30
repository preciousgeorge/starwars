const toFeet = cm => {
  let realFeet = (cm * 0.3937) / 12;
  let feet = Math.floor(realFeet);
  let inches = Math.ceil((realFeet - feet) * 12 * 100) / 100;
  return feet + 'ft and ' + inches + 'inches';
}

const convertDateToUTC = date => {
  return date.toUTCString();
};

module.exports = {
  toFeet,
  convertDateToUTC
};
