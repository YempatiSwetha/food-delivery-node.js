const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Organization = sequelize.define('organization', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Organization;