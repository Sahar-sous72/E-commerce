import jwt from 'jsonwebtoken'
import { AppError } from '../../appError.js';
import userModel from '../../DB/models/user.model.js';
export const auth =async(req,res,next)=>{
    try{
    const {authorization}=req.headers;
    if(! authorization?.startsWith(process.env.BearerToken)){ // bearer token
        return next(new AppError("invalid token",500))
    }
    
    const token=authorization.split(process.env.BearerToken)[1];
  
    const decoded = jwt.verify(token,process.env.Signiture)
    if(!decoded){
        return next(new AppError("invalid token",500))
    }
    
    req.id = decoded.id;
    const user =await userModel.findById(req.id)
    req.role=user.role;
    next();
}catch(error){
    return res.status(500).json({message:"catch error ",error:error.stack})
}
}

export const admin=async(req,res,next)=>{
    try{
    const createdBy=req.id;
    if(!await userModel.findById(createdBy)){
      return next(new AppError("user not found",404))
    }
    
    //return res.json(req.role)
    if(req.role !== "admin"){
      return next(new AppError("You don't have authentication to create,update and delete your own categories ",404))
    }
    next();
}catch(error){
    return res.status(500).json({message:"catch error ",error:error.stack})
}
}