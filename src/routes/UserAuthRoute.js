const express = require('express');
const Route=express.Router();
const UserAuthController=require('../controller/UserAuthCtl');
const errorHandler=require('../service/errorHandling');
const Auth = require('../middlewares/authMiddleWear');

Route.post('/auth/signup',UserAuthController.createUser);//signUp a new user and create a new orgnization along
Route.post('/auth/login',UserAuthController.loginUser);//loging user

Route.get('/users/:id',Auth.authmiddleware,UserAuthController.getaUserbyId);//get user by id with the accesstoken which returns the user and the user orgnisation



Route.use(errorHandler.notfound);//this is to handle endpoin thatt are not found
Route.use(errorHandler.errorHandler);//this is to handle erros that may occor
module.exports=Route;