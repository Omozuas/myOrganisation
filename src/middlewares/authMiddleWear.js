const { User }=require("../model/user.model");
const jwt=require('jsonwebtoken');
const asynchandler=require('express-async-handler');


class Auth{
   static authmiddleware =asynchandler(async(req,res,next)=>{
    let token;
    if(!req?.headers?.authorization?.startsWith('Bearer')){
      throw new Error('Not authorized. No token');
    }
    if(req?.headers?.authorization?.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1];
      
       try{
         if(token){
            const decode=  jwt.verify(token, process.env.JWT_SECRET)
            const user = await User.findByPk(decode.id);
            if(!user)throw new Error('Wrong or expired token')
            req.user = user;
            next();
         }
        
       }catch(error){
         throw new Error('Wrong or expired token');
       }
      }
   
   });

}

module.exports=Auth;