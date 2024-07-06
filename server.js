const express = require('express');
const bodyPerser=require('body-parser')
const dotenv = require('dotenv').config()
const cors =require('cors');
const cron = require("node-cron");
// const dbConnect =require('./src/data/databaseConnect');
const morgan=require('morgan');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser())
app.use('/api',UserAuth);//main user endPoint




//start server
app.listen(process.env.PORT ,()=>{
    console.log(`server is running on ${process.env.PORT}`)
})