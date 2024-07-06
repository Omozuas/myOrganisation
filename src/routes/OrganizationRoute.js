const express = require('express');
const Route=express.Router();
const OrganisationController=require('../controller/OrganizationClt');
const errorHandler=require('../service/errorHandling');
const Auth = require('../middlewares/authMiddleWear');

Route.get('/:id/me',OrganisationController.getOrganisationsId);//to get a single orgnization by

Route.post('/create-organization',Auth.authmiddleware,OrganisationController.createOrganization);//to create a new orgnization
Route.post('/:id/users',Auth.authmiddleware,OrganisationController.addAUserToAnOrganization);//to add a user to an organization
Route.get('/get-all-organization/userId',Auth.authmiddleware,OrganisationController.getUserOrganisations);//to get all the organization a user is in




Route.use(errorHandler.notfound);
Route.use(errorHandler.errorHandler);
module.exports=Route;