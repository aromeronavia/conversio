const request = require('request');
const url = require('url');

const {API_ERROR, CONVERSION_ERROR, INVALID_CURRENCY} = require('./errors');

const MONEY_REGEX = /\d+\.\d{4}/;
const currencies = Object.keys(require('./currencies.json'));

const convert = (args, callback) => {
  if (!currencies.includes(args.from) || !currencies.includes(args.to)) {
    return callback(INVALID_CURRENCY);
  }
  _request(args, callback);
};

const _request = (args, callback) => {
  const uri = buildRequestURI(args);
  request(uri, (error, response) => {
    if (error) return callback(API_ERROR);
    if (response.statusCode !== 200) return callback(API_ERROR);
    handleResponse(args, response, callback)
  });
};

const handleResponse = (args, response, callback) => {
  const {body} = response;
  const converted = parseFloat(getConvertedMoney(body));
  if (!converted) return callback(CONVERSION_ERROR);
  const result = Object.assign({}, args, {converted});
  callback(null, result);
};

const buildRequestURI = ({amount, from, to}) => {
  const uriObj = {
    protocol: 'https',
    hostname: 'www.google.com',
    pathname: '/finance/converter',
    search: `?a=${amount}&from=${from}&to=${to}`
  };

  return url.format(uriObj);
};

const getConvertedMoney = body => {
  const match = body.match(MONEY_REGEX);
  if (!match) return null;
  return match[0];
};

module.exports = convert;
