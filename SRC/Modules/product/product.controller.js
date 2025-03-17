import { AppError } from "../../../appError";
import { AppSucc } from "../../../AppSucc";
import categoryModel from "../../../DB/models/category.model";
import productModel from "../../../DB/models/product.model";
import subCategoryModel from "../../../DB/models/subCategory.model";
import cloudinary from "../../Utils/cloudinary/cloudinary";

export const createProduct=async(req,res,next)=>{
    const {name,discount,price,categoryId,subCategoryId}=req.body;
    const category = await categoryModel.findById(categoryId);
    if(!category){
        return next(new AppError("categort not found .",404))
    }
    const subCategory = await subCategoryModel.findOne({_id:subCategoryId,categoryId:categoryId});
    if(!subCategory){
        return next(new AppError("subCategort not found .",404))
    }
    req.body.finalPrice= price -((price * (discount || 0))/100);
    const{secure_url,public_id}=await cloudinary.uploader.upload(req.files.mainImage[0].path,{folder:`${process.env.APPNAME}/product/${name}`});
    req.body.mainImage={secure_url,public_id}
    req.body.subImages =[];
    for(const file of req.files.subImages){
        const{secure_url,public_id}=await cloudinary.uploader.upload(file.path,{folder:`${process.env.APPNAME}/product/${name}/subImages`});
        req.body.subImages.push({secure_url,public_id})

    }
    const product =await productModel.create(req.body);
    return res.status(201).json("sucess",product)
}

export const getAllProduct =async(req,res,next)=>{
    const products = await productModel.find({});
    return res.status(201).json({message:"success",products})
  }
  
  // get product by id 
  export const getById=async (req,res,next)=>{
    //return res.json("hi")
  
    const {id}=req.params;
    //return res.json(id)
  
    const product =await productModel.findById(id);
    if(!product){
      return next(new AppError("product not found",404))
    }
    return res.status(200).json({message:"success",product})
  }
  
  //update product (name,status)
  export const updateProduct=async (req,res,next)=>{
   
    const product =await productModel.findById(req.params.id)
    if(!product){
      return next(new AppError("product not found",404))
    }
    req.body.name=req.body.name.toLowerCase();
    if(await productModel.findOne({name:req.body.name})){
      return next(new AppError("name is exit",404))
    }
  /*  await cloudinary.uploader.destroy(category.image.public_id)
  
    if(req.file){
      const {secure_url,public_id}=await cloudinary.uploader.upload(req.file.path,{folder:`${process.env.APPNAME}/category`});  // حتى يتخزن داخل ملف كاتيغوري داخل مجلد ايكوميرس في الكلاوندري
      req.body.image={secure_url,public_id}
    }*/
    const newProduct=await productModel.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      status:req.body.status
    },{
      new:true
    })
    return res.json({message:"success",newProduct})
  
  }
  
  //delete product
  export const deleteProduct=async(req,res,next)=>{
  const product =await productModel.findByIdAndDelete(req.params.id);
  if(!product){
    return next(new AppError("product does not exit",404))
  }
  const subCategories=await subCategoryModel.find({categoryId:product.categoryId})
  // return res.json(subCategories);
 const category =await categoryModel.findByIdAndDelete({_id:product.categoryId});
  await cloudinary.uploader.destroy(category.image.public_id)
  await subCategoryModel.deleteMany({categoryId:req.params.id});
  await cloudinary.uploader.destroy(product.mainImage.public_id)
  await cloudinary.uploader.destroy(product.subImages.public_id)
  
  return next(new AppSucc("success",201))
  }
  