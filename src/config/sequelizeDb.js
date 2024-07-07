const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://hngtask2_user:E5ESxaYlIkCzQlcg8INv8UHCnGt3IBO2@dpg-cq4gosdds78s73cju6kg-a.oregon-postgres.render.com/hngtask2', {
    dialect: process.env.DB_USERS,
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