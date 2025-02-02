const { DataTypes } = require('sequelize');
const { generateOrganizationId } = require('../service/generateOrgId');
const sequelize = require('../config/sequelizeDb');
  const Organisation = sequelize.define('Organisation', {
    organization_id: {
        type: DataTypes.STRING,
        defaultValue: generateOrganizationId,
        primaryKey: true,
        unique: true,
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    }
  }, {});

  module.exports = { Organisation };