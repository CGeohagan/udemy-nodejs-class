const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Picassoangel7.4<3', {
  dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;
