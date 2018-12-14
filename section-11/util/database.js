const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', '556556556', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;