import { required } from "joi";
import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema=new Schema({
    name:{
        type:String,
        required:true
    },image:{
        type:String
    },status:{
        type:String,
        enum:['active','not-active']

    }
},{
    timestamps:true
})

const categoryModel =mongoose.model('Category',categorySchema);

export default categoryModel;