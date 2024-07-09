const express = require('express');
const Route=express.Router();
const UserAuthController=require('../controller/UserAuthCtl');
const OrganisationController=require('../controller/OrganizationClt');
const errorHandler=require('../service/errorHandling');
const Auth = require('../middlewares/authMiddleWear');


Route.post('/auth/register',UserAuthController.createUser);//signUp a new user and create a new orgnization along
Route.post('/auth/login',UserAuthController.loginUser);//loging user
Route.get('/api/users/:id',Auth.authmiddleware,UserAuthController.getaUserbyId);//get user by id with the accesstoken which returns the user and the user orgnisation


Route.post('/api/organisations',Auth.authmiddleware,OrganisationController.createOrganization);//to create a new orgnization
Route.post('/api/organisations/:orgId/users',Auth.authmiddleware,OrganisationController.addAUserToAnOrganization);//to add a user to an organization
Route.get('/api/organisations',Auth.authmiddleware,OrganisationController.getUserOrganisations);//to get all the organization a user is in
Route.get('/api/organisations/:orgId',Auth.authmiddleware,OrganisationController.getOrganisationsId);//to get a single orgnization by



Route.use(errorHandler.notfound);//this is to handle endpoin thatt are not found
Route.use(errorHandler.errorHandler);//this is to handle erros that may occor
module.exports=Route;