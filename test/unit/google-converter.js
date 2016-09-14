const nock = require('nock');

const convert = require('google-converter');
const validConversionFixture = require('./page.html');

const API_URL = 'https://www.google.com';

describe('Google money converter', () => {
  it('should retrieve a right conversion', (done) => {
    nock(`${API_URL}`)
      .get('/finance/converter')
      .query(true)
      .reply(200, validConversionPage);

    const expected = { amount: 18, converted: 0.0520, from: 'MXN', to: 'USD' };
    convert({ amount: 18, from: 'MXN', to: 'USD' }, (error, result) => {
      if (error) return done(error);
      expect(result).to.be.deep.equal(expected);
      done();
    });
  });

  it('should fail if connection was unsuccessful', (done) => {
    nock(`${API_URL}`)
      .get('/finance/converter')
      .query(true)
      .reply(404, 'INVALID TEXT REGEX WILL NEVER FIND NUMBERS');

    convert({ amount: 18, from: 'MXN', to: 'USD' }, (error, result) => {
      expect(error).to.exist;
      expect(result).to.not.exist;
      expect(error.name).to.be.equal('GOOGLE_API_ERROR');
      done();
    });
  });

  it('should fail if currencies are invalid', (done) => {
    nock(`${API_URL}`)
      .get('/finance/converter')
      .query(true)
      .reply(200, 'INVALID TEXT REGEX WILL NEVER FIND NUMBERS');

    convert({ amount: 18, from: 'JAJASALUDOS', to: 'USD' }, (error, result) => {
      expect(error).to.exist;
      expect(result).to.not.exist;
      expect(error.name).to.be.equal('INVALID_CURRENCY_ERROR');
      done();
    });
  });

  it('should fail if html page has no valid result', (done) => {
    nock(`${API_URL}`)
      .get('/finance/converter')
      .query(true)
      .reply(200, 'INVALID HTML REGEX WILL NEVER FIND NUMBERS');

    convert({ amount: 18, from: 'MXN', to: 'USD' }, (error, result) => {
      expect(error).to.exist;
      expect(result).to.not.exist;
      expect(error.name).to.be.equal('CONVERSION_ERROR');
      done();
    });
  });
});
