const { Sequelize } = require('sequelize');

class Validate {
  static validateUuid(userId) {
    if (!Sequelize.Validator.isUUID(userId, 4)) {
      throw new Error('ID not valid or not found');
    }
  }
}
//to validat the userId if its real
module.exports = Validate;