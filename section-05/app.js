const express = require('express');

const app = express();

app.use('/', (req, res, next) => {
  console.log('This always runs!');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('Add product!');
  res.send('<h1>Add product</h1>');
});

app.use('/', (req, res, next) => {
  console.log('Welcome!');
  res.send('<h1>Hello from express!</h1>');
});

app.listen(3000);