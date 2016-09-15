const converter = require('./lib/google-converter');

module.exports = () => {
  const convert = ({amount, from, to}, callback) => {
    return converter.convert({amount, from, to}, callback);
  };

  const getExchangeRate = ({from, to}, callback) => {
    return converter.convert({amount: 1, from, to}, callback);
  };

  return { convert, getExchangeRate };
};
