import mongoose from "mongoose";
import { Schema ,Types} from "mongoose";
const userSchema =new Schema({
    userName:{
        type:String,
        //required:true
    },email:{
        type:String,
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