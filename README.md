![image_squidhome@2x.png](http://i.imgur.com/mvNmZcr.jpg)

# MagentoJS

A Magento's connector for Node.js applications


## Installation

Install from NPM.

```bash
$ npm install magentojs
```


## How to use:

```javascript
var config = {
    host: 'www.mystore.com',
    port: 80,
    path: '/api/xmlrpc/',
    login: 'myuser',
    pass: 'mypassowrd'
};

var magento = require('MagentoJS')(config);


magento.init(function(err) {
    magento.sales_order.info('400010774', function(err,order) { console.log(order); });
});
```


## MagentoJS License

### The MIT License (MIT)

Copyright © 2012-2013 Mike McNeil

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Credits to <a href='http://qzaidi.github.io/2011/10/16/magento-node/'>Alan Kay</a>.
