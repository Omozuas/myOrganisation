// const Client= require('pg');
// const dotenv = require('dotenv').config()
// async function connect(){
// const client = new Client.Pool({
//     // user: process.env.DB_USERS,
//     // host: process.env.DB_HOST,
//     // port:process.env.DB_PORT,
//     // password:process.env.DB_PASSWORD,
//     // database:process.env.DB_NAME,
//     connectionString:"postgresql://hngtask2_user:E5ESxaYlIkCzQlcg8INv8UHCnGt3IBO2@dpg-cq4gosdds78s73cju6kg-a.oregon-postgres.render.com/hngtask2"
// })

// client.connect()
// .then(() => console.log('Connected to PostgreSQL database'))
// .catch(err => console.error('Connection error', err.stack))

// }




module.exports= {connect};