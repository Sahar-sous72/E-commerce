
import categoryModel from "../../../DB/models/category.model.js";
import { AppError } from "../../../appError.js";
import { AppSucc } from "../../../AppSucc.js";
import userModel from "../../../DB/models/user.model.js";
import cloudinary from "./../../Utils/cloudinary/cloudinary.js"
import subCategoryModel from "../../../DB/models/subCategory.model.js";

export const createCategory=async(req,res,next)=>{
  
    req.body.name=req.body.name.toLowerCase();
    const name =req.body.name;
    const status=req.body.status;
    if(await categoryModel.findOne({name})){
      return next(new AppError("category exit",404))
    }

    if(req.file){
     
     const {secure_url,public_id} =await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/category`});
    req.body.image={secure_url,public_id}
    
    }
    req.body.createdBy=req.id;
    const category=await categoryModel.create(req.body)
    return next(new AppSucc("success",200))


}

//read all category 
export const getAllCategory =async(req,res,next)=>{
  const categories = await categoryModel.find({});
  return res.status(201).json({message:"success",categories})
}

// get category by id 
export const getById=async (req,res,next)=>{
  //return res.json("hi")

  const {id}=req.params;
  //return res.json(id)

  const category =await categoryModel.findById(id);
  if(!category){
    return next(new AppError("categoty not found",404))
  }
  return res.status(200).json({message:"success",category})
}

//update category (name,status,image)
export const updateCategory=async (req,res,next)=>{
  //return res.json("hi")
  //return res.json(req.params)
  const category =await categoryModel.findById(req.params.id)
  if(!category){
    return next(new AppError("category not found",404))
  }
  req.body.name=req.body.name.toLowerCase();
  if(await categoryModel.findOne({name:req.body.name})){
    return next(new AppError("name is exit",404))
  }
  await cloudinary.uploader.destroy(category.image.public_id)

  if(req.file){
    const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/category`});  // حتى يتخزن داخل ملف كاتيغوري داخل مجلد ايكوميرس في الكلاوندري
    req.body.image={secure_url,public_id}
  }
  const newCategort=await categoryModel.findByIdAndUpdate(req.params.id,{
    name:req.body.name,
    image:req.body.image,
    status:req.body.status
  },{
    new:true
  })
  return res.json({message:"success",newCategort})

}

//delete category
export const deleteCategory=async(req,res,next)=>{
  const subCategories=await subCategoryModel.find({categoryId:req.params.id})
 // return res.json(subCategories);
const category =await categoryModel.findByIdAndDelete(req.params.id);

if(!category){
  return next(new AppError("category does not exit",404))
}
await cloudinary.uploader.destroy(category.image.public_id)
await subCategoryModel.deleteMany({categoryId:req.params.id});

return next(new AppSucc("success",201))
}
