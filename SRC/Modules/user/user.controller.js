import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import userModel from "../../../DB/models/user.model.js";
import cloudinary from "./../../Utils/cloudinary/cloudinary.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { sendEmail } from './../../utils/sendEmail.js'
import { LoginSchema } from "./user.validation.js";

//register
export const register =async(req,res,next)=>{
    const{email,password,userName}=req.body;
   
    if(await userModel.findOne({email})){
        return next (new AppError("email exit",404))
    }
    const hashPass= bcrypt.hashSync(password,parseInt(process.env.SALTROUND));
    const html = `
    <div>
     <p style='color:tomato'>Dear : <b>${userName}</b></p>
     <h1 style='text-align:center;color:blue;width:40%'> Welcome in SARAHA SITE !</h1>
     <h2 style='text-align:center;color:blue;width:40%'>Hello <b>${userName}</b> , You are register in our site ,How can help you?</h2>
    </div>
    `
    sendEmail(email,"WELCOME",html);
    if(req.file){
        const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/user`});
        req.body.image={secure_url,public_id}
    }
    req.body.password=hashPass;
    req.body.userName=userName
   // return res.json(req.body)
    const newUser =await userModel.create(req.body);
   // return res.json(newUser)
    return next(new AppSucc("success",201))

}

// log in
export const login=async(req,res,next)=>{
    const{email,password}=req.body;
    const result= LoginSchema.body.validate({email,password},{abortEarly:false})
    if(result.error?.details){
        return res.status(404).json({message:"error validation",error:result.error.details})
       }
       const user=await userModel.findOne({email})
    if(!user){
        return next(new AppError("email not found",409))
    }
    const match=bcrypt.compareSync(password,user.password);
    if(!match){
        return next(new AppError("invalid password ",409))
    }
    const token=await jwt.sign({id:user._id},process.env.Signiture,{
        expiresIn:'3h'
    })
    return res.status(201).json({message:"success",token})

}