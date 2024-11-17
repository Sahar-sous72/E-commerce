import mongoose from "mongoose";
import { Schema ,Types} from "mongoose";

const subCategorySchema=new Schema({
    name:{
        type:String,
        required:true
    },image:{
        type:Object,
        required:true
    },status:{
        type:String,
        enum:['active','not-active']

    },
    categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true
    }
    ,
    createdBy:{
    type:Types.ObjectId,
    ref:'User',
   // required:true
    },updatedBy:{
        type:Types.ObjectId,
        ref:'User',
       // required:true
        }
},{
    timestamps:true
})

const subCategoryModel =mongoose.model('subCategory',subCategorySchema);

export default subCategoryModel;