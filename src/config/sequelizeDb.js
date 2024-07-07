const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    logging:false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false 
      }
    }
  });
    
  // const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERS, process.env.DB_PASSWORD, {
  //   host: process.env.DB_HOST,
  //   dialect: 'postgres',
  //   logging:false
  // });

  sequelize.authenticate()
  .then(() => console.log('Connected to PostgreSQL database with Sequelize'))
  .catch(err => console.error('Unable to connect to the database:', err));

  module.exports = sequelize;