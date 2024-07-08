// const Client= require('pg');
// const dotenv = require('dotenv').config()
// async function connect(){
// const client = new Client.Pool({
//     // user: process.env.DB_USERS,
//     // host: process.env.DB_HOST,
//     // port:process.env.DB_PORT,
//     // password:process.env.DB_PASSWORD,
//     // database:process.env.DB_NAME,
//     connectionString:process.env.DB_URL
// })

// client.connect()
// .then(() => console.log('Connected to PostgreSQL database'))
// .catch(err => console.error('Connection error', err.stack))

// }

// user.service.js

// const {User} = require('../model/user.model'); // Adjust path as per your project structure

// async function getAllUsers() {
//   try {
//     const users = await User.findAll();
//     console.log(users)
//     return users;
    
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     throw error;
//   }
// }

// module.exports = { getAllUsers };



// module.exports= {connect};