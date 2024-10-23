import { required } from "joi";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema =new Schema({
    userName:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    
    },password:{
        type:String,
        required:true 
    },gender:{
        type:String,
        enum:['Male','Female']
    },confirmEmail:{
        type:Boolean,
        default:false
    },image:{
        type:String
    },phone:{
        type:String
    },address:{
        type:String,
        required:true
    },statue:{
        type:String,
        enum:['active','not-active']
    },role:{
        type:String,
        enum:['user','admin']
    }
},{
    timestamps:true
})

const userModel=mongoose.model('User',userSchema);
export default userModel;