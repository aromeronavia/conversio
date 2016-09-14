const googleConverter = require('./lib/google-converter');

module.exports = converter => {
  const converters = {
    google: googleConverter
  };

  const convert = ({amount, from, to}, callback) => {
    return converter.convert({amount, from, to}, callback);
  };

  const getExchangeRate = ({from, to}, callback) => {
    return converter.convert({amount: 1, from, to}, callback);
  };

  return {converters, convert, getExchangeRate};
};
