const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProcutsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(t) {
    this.title = t;
  }

  save() {
    getProcutsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products),(err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    // remember that static means we can call directly on Product wihtout instantiation
    getProcutsFromFile(cb);
  }
};