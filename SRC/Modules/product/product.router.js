import { Router } from "express";
import * as productController from './product.controller.js'
import fileUpload from "../../Utils/multer.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { auth,admin, roles } from "../../MiddleWare/auth.js";
import validation from "../../MiddleWare/validation.js";
import { endPoints } from "./product.roles.js";

const app =Router();


//create product
app.post('/create',auth(endPoints.create),admin,fileUpload(fileType.image).fields([
    {name:'mainImage',maxCount:1},
    {name:'subImage',maxCount:5}
]),asyncHandler(productController.createProduct));

//read all product
app.get('/',auth(endPoints.getAll),asyncHandler(productController.getAllCategory))

//get product by id
app.get('/getCategory/:id',auth(endPoints.getById),asyncHandler(productController.getById))

//update product
app.patch('/update/:id',auth(endPoints.update),fileUpload().single('image'),asyncHandler(productController.updateCategory))

//delete product
app.delete('/delete/:id',auth(endPoints.delete),asyncHandler(productController.deleteCategory))

export default app;