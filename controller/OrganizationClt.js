const asynchandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const {Organisation}=require('../model/organization.model');
const { User }  = require('../model/user.model'); 
const { validateUuid } = require('../service/validateUserId');

class OrganisationController{

  static createOrganization=asynchandler(async(req,res)=>{
        const { name, description } = req.body;
        const userId = req.user; 

        if (!name) {
            throw new Error( 'Organization name is required' );
          }
          if (!description) {
            throw new Error( 'Organization description is required');
          }

        try {
            const isExisting = await Organisation.findOne({ where: { name } });
            if (isExisting) {
                throw new Error('supply another organization name');
            }
            
            const organisation = await Organisation.create({
                name: name,
                description: description
              });
             
            await userId.addOrganisation(organisation);
            
          
            return res.status(200).json({data:organisation,message:'Organisation created successfully',status: "success"});
        } catch (error) {
            throw new Error( error );
        }
  });
      
  static getUserOrganisations=asynchandler(async(req,res)=>{
    
        const {userId} = req.user;           
        try {
            
            validateUuid(userId);
           
            
            const user = await User.findByPk(userId, {
                include: [{
                  model: Organisation,
                  attributes: ['organization_id', 'name', 'description']
                }]
              });

            if(!user){
                throw new Error('User not found')
              }
             
              const organisations = user.Organisations;
            
              if (organisations.length == 0) {
               
                throw new Error('') 
              }
            return res.status(200).json({data:organisations,message:'Organizations retrived',status: "success"});
        } catch (error) {
            throw new Error( error );
        }
  });
    
  static addAUserToAnOrganization=asynchandler(async(req,res)=>{
        const organization_id  = req.params.orgId;
        const {userId} = req.body;           
        try {
        
            validateUuid(userId);
           
            
            const organisation = await Organisation.findByPk(organization_id);
            const user = await User.findByPk(userId);

            if(!user){
                throw new Error('User not found')
              }
              if(!organisation){
                throw new Error('organisation not found')
              }
              await organisation.addUser(user);
             
           const updatedOrganisation = await Organisation.findByPk(organization_id, {
              include: User
           });
  
      
         const updatedUser = await User.findByPk(userId, {
              include: Organisation 
          });
              
            
        
            return res.status(200).json({
                data:{
                    organisation:updatedOrganisation,
                    user:updatedUser
                },message:'User added to organisation successfully',status: "success"});
        } catch (error) {
            throw new Error( error );
        }
  });

  static getOrganisationsId=asynchandler(async(req,res)=>{
    
        const organization_id  = req.params.orgId;  
            
        try {
         
            const organisation = await Organisation.findByPk(organization_id, {include: User});
           
              if (!organisation) {
                throw new Error('norganisation not found')
              }
          
            return res.status(200).json({data:organisation,message:'Organizations retrived',status: "success"});
        } catch (error) {
            throw new Error( error );
        }
  });
}

module.exports=OrganisationController;