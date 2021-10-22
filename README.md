# [DEPRECATED] Conversio

Conversio is an open source tool for money conversion using the [Google money converter](https://www.google.com/finance/converter).

A simple snippet of how to use:
```js
const {convert} = require('currencio');
convert({amount: 1, from: 'USD', to: 'MXN'}, callback);
```

The response format:
```js
{
  amount: 1,
  converted: 19.2035,
  from: 'USD',
  to: 'MXN'
}
```

You can also obtain the exchange rate between two currencies:
```js
const {getExchangeRate} = require('currencio');
getExchangeRate({from: 'USD', to: 'MXN'}, callback);
```
