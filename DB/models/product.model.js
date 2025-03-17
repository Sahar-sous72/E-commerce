import mongoose from "mongoose";
import { Schema ,Types} from "mongoose";

const productSchema=new Schema({
    name:{
        type:String,
        required:true
    },mainImage:{
        type:Object,
        required:true
    },
    subImages:[{
        type:Object,
    }]
    ,status:{
        type:String,
        enum:['active','not-active'],
        default:'active'

    },
    description:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        default:1
    },
    price:{
        type:Number,
        required:true
    },
    finalPrice:{
        type:Number,
    },
    discount:{
        type:Number,
        default:0
    }
    ,
    pricrAfterDiscount:{
        type:Number
    },colors:[String]
    , categoryId:{
        type:Types.ObjectId,
        ref:'Category',
        required:true
    }
    ,size:{
        type:String,
        enum:['sm','md','lg','x-lg','xx-lg','xxx-lg'],
        default:'md'

    },
    subCategoryId:{
        type:Types.ObjectId,
        ref:'subCategory',
        required:true
    },
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
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

    


const productModel =mongoose.model('Product',productSchema);

export default productModel;