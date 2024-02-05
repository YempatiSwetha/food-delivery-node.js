const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('food_delivery_app', 'postgres', 'Swetha@123', {
  host: 'localhost',
  dialect: 'postgres',
});

const Organization = sequelize.define('Organization', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Item = sequelize.define('Item', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Organization, Item };