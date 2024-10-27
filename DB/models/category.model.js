import mongoose from "mongoose";
import { Schema ,Types} from "mongoose";

const categorySchema=new Schema({
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
   /* createdBy:{
    type:Types.ObjectId,
    ref:'User',
    required:true
    },updatedBy:{
        type:Types.ObjectId,
        ref:'User',
        required:true
        }*/
},{
    timestamps:true
})

const categoryModel =mongoose.model('Category',categorySchema);

export default categoryModel;