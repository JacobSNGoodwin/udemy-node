const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addPropduct(id, productPrice) {
    // fetch old or previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {products: [], totalPrice: 0}
      if (!err) {
        // error only if cart fileContent doesn't exist
        cart = JSON.parse(fileContent);
      }
      // Determine if card already has existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;
      // Add new product or increase the quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1};
        cart.products = [...cart.products, updatedProduct];
      }
      // compute total price - extra plus to string to number conversion
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
}