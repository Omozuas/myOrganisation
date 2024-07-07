const express = require('express');
const bodyPerser=require('body-parser')
const dotenv = require('dotenv').config()
const cors =require('cors');
const cron = require("node-cron");
// const dbConnect =require('./src/data/databaseConnect');
const morgan=require('morgan');
const UserAuth =require('./src/routes/UserAuthRoute')

require('./src/model/userOrganization');

const app=express();
// dbConnect.connect();

//router
app.use(cors());
app.use(morgan('dev'))
app.use(bodyPerser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.send('Hello World')
})
app.use('/api',UserAuth);//main user endPoint

cron.schedule("*/4 * * * * ", async () => {
    try {
      const currentTime = new Date();
      console.log(`Current time: ${currentTime}`);
      
      const response = await axios.get('https://myorganisation.onrender.com');
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error fetching API:', error);
    }
  });

module.exports = app;

if (require.main === module) {
//start server
app.listen(process.env.PORT ,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})
}