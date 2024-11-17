
import subCategoryModel from "../../../DB/models/subCategory.model.js";
import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import userModel from "../../../DB/models/user.model.js";
import cloudinary from "../../Utils/cloudinary/cloudinary.js"
import categoryModel from "../../../DB/models/category.model.js";

export const createsubCategory=async(req,res,next)=>{
 // return res.json(req.body)

  const  {categoryId} =req.body;
  const category =await categoryModel.findById(categoryId)
 // return res.json(req.body.categoryId)
  if(! category){
    return next(new AppError("Category not found",404))

  }
    req.body.name=req.body.name.toLowerCase();
    const name =req.body.name;
    const status=req.body.status;
    if(await categoryModel.findOne({name})){
      return next(new AppError("Category exit",404))
    }
    if(await subCategoryModel.findOne({name})){
      return next(new AppError("This subCategory exit",404))
    }

    if(req.file){
     
     const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/subCategory`});
    req.body.image={secure_url,public_id}
    
    }
    req.body.createdBy=req.id;
    req.body.updatedBy=req.id;

    const subCategory=await subCategoryModel.create(req.body)
    return next(new AppSucc("success",200))


}

//read all subCategory 
export const getAllCategory =async(req,res,next)=>{
  const categories = await subCategoryModel.find({});
  return res.status(201).json({message:"success",categories})
}

// get subCategory by id 
export const getById=async (req,res,next)=>{
  //return res.json("hi")

  const {id}=req.params;
  //return res.json(id)

  const subCategory =await subCategoryModel.findById(id);
  if(!subCategory){
    return next(new AppError("categoty not found",404))
  }
  return res.status(200).json({message:"success",subCategory})
}

//update subCategory (name,status,image)
export const updateCategory=async (req,res,next)=>{
  //return res.json("hi")
  //return res.json(req.params)
  const subCategory =await subCategoryModel.findById(req.params.id)
  if(!subCategory){
    return next(new AppError("subCategory not found",404))
  }
  req.body.name=req.body.name.toLowerCase();
  if(await subCategoryModel.findOne({name:req.body.name})){
    return next(new AppError("name is exit",404))
  }
  await cloudinary.uploader.destroy(subCategory.image.public_id)

  if(req.file){
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/subCategory`});  // حتى يتخزن داخل ملف كاتيغوري داخل مجلد ايكوميرس في الكلاوندري
    req.body.image={secure_url,public_id}
  }
  const newCategort=await subCategoryModel.findByIdAndUpdate(req.params.id,{
    name:req.body.name,
    image:req.body.image,
    status:req.body.status
  },{
    new:true
  })
  return res.json({message:"success",newCategort})

}

//delete subCategory
export const deleteCategory=async(req,res,next)=>{
const subCategory =await subCategoryModel.findByIdAndDelete(req.params.id);

if(!subCategory){
  return next(new AppError("subCategory does not exit",404))
}
await cloudinary.uploader.destroy(subCategory.image.public_id)
return next(new AppSucc("success",201))
}
