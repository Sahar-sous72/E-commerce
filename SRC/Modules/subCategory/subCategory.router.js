import { Router } from "express";
import * as subCategoryController from './subCategory.controller.js'
import fileUpload from "../../Utils/multer.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { auth,admin, roles } from "../../MiddleWare/auth.js";
import { createCategorySchema } from "./subCategory.validation.js";
import validation from "../../MiddleWare/validation.js";
import { endPoints } from "./subCategory.roles.js";
const app =Router({mergeParams:true});



//create subcategory
app.post('/create',auth(endPoints.create),fileUpload().single('image'),validation(createCategorySchema),asyncHandler(subCategoryController.createsubCategory));

//read all subcategory
app.get('/',auth(endPoints.getAll),asyncHandler(subCategoryController.getAllCategory))

//get category by id
app.get('/getCategory/:id',auth(endPoints.getById),asyncHandler(subCategoryController.getById))

//update subcategory
app.patch('/update/:id',auth(endPoints.update),fileUpload().single('image'),asyncHandler(subCategoryController.updateCategory))

//delete subcategory
app.delete('/:id',auth(endPoints.delete),asyncHandler(subCategoryController.deleteCategory))

export default app;