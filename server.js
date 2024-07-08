const express = require('express');
const bodyPerser=require('body-parser')
const dotenv = require('dotenv').config()
const cors =require('cors');
const cron = require("node-cron");
const axios=require('axios');

// const dbConnect =require('./src/data/databaseConnect');
const morgan=require('morgan');
const UserAuth =require('./src/routes/UserAuthRoute')

require('./src/model/userOrganization');

const app=express();
// dbConnect.getAllUsers();

//router
app.use(cors());
app.use(morgan('dev'))
app.use(bodyPerser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/hi',(req,res)=>{
    res.send('Hello World')
})
app.use('/api',UserAuth);//main user endPoint



module.exports = app;

if (require.main === module) {
    cron.schedule("*/5 * * * * ", async () => {
    const response = await axios.get('https://myorganisation.onrender.com/hi');
    console.log(response.data);
  });
//start server
app.listen(process.env.PORT ,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})
}