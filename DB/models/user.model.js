import mongoose from "mongoose";
import { Schema ,Types} from "mongoose";
const userSchema =new Schema({
    userName:{
        type:String,
        required:true
    },email:{
        type:String,
        unique:true,
        required:true
    },password:{
        type:String,
        required:true 
    },gender:{
        type:String,
        enum:['Male','Female'],
        required:true
    },confirmEmail:{
        type:Boolean,
        default:false
    },image:{
        type:Object,
        required:true
    },phone:{
        type:String
    },address:{
        type:String
    },statues:{
        type:String,
        enum:['active','not-active'],
        default:'not-active'
    },role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{
    timestamps:true
})

const userModel=mongoose.model('User',userSchema);
export default userModel;