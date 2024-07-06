const asynchandler=require('express-async-handler');
const bcrypt=require('bcrypt');
const { User }  = require('../model/user.model');
const {Organisation}=require('../model/organization.model');
const jwtToken = require('../service/jwtToken'); 
const { validateUuid } = require('../service/validateUserId');
class UserAuthController{
  
  static createUser=asynchandler(async(req,res)=>{
    const{firstName,lastName,email,password,phone}=req.body;

    if (!firstName) {
        throw new Error( 'First name is required' );
      }
      if (!lastName) {
        throw new Error( 'Last name is required' );
      }
      if (!email) {
        throw new Error( 'Email is required' );
      }
      if (!password) {
        throw new Error( 'Password is required' );
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error( 'Email is not valid' );
      }
    try {
        const isExisting = await User.findOne({ where: { email } });
        if (isExisting) {
            throw new Error('Email already exists');
        }
        const hashPassword=await bcrypt.hash(password,10);
        const user = await User.create({ firstName, lastName, email, password: hashPassword, phone });
        const organisationName = `${firstName}'s Organisation`;
        const organisation = await Organisation.create({
            name: organisationName,
            description: `Organisation for ${firstName}`
          });
         
        await user.addOrganisation(organisation);
        const accessToken=jwtToken.generateToken(user?.userId);
        return res.status(200).json({data:user,accessToken:accessToken,message:'SigUp successful',status: "success"});
    } catch (error) {
        throw new Error( error );
    }
  });

  static loginUser=asynchandler(async(req,res)=>{
    const { email, password } = req.body;
    if (!email) {
        throw new Error( 'Email is required' );
    }
    if(!password){
        throw new Error('Password is required');
    }
    try {
       
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }
        const accessToken=jwtToken.generateToken(user?.userId)
        return res.status(200).json({data:user,accessToken:accessToken,message:'Login successful',status: "success"});
    }catch(error){
        throw new Error(error);
    }
  });

  static getaUserbyId = asynchandler(async(req,res)=>{
    const { userId} = req.user;
    
    validateUuid(userId);
    const user = await User.findByPk(userId, {
        include: {
          model: Organisation,
          through: { attributes: [] }, 
        },
      });

  if (!user) {
    throw new Error('User not found');
  }
    res.status(200).json({data:user,message:'user retrived',status: "success"});
  });

//   static getUserOrganisations = asynchandler(async(req,res)=>{
//     const { userId} = req.user;
//     validateUuid(userId);
//     const user = await User.findByPk(userId, {
//         include: {
//           model: Organisation,
//           through: { attributes: [] }, 
//         },
//       });

//   if (!user) {
//     throw new Error('User not found');
//   }
//     res.status(200).json({data:user,message:'user retrived',status: "success"});
//   });

}

module.exports=UserAuthController;