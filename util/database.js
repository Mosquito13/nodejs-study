const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodejs-study', 'postgres', '111111', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5433
});

module.exports = sequelize;