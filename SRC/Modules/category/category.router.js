import { Router } from "express";
import * as categoryController from './category.controller.js'
import fileUpload from "../../Utils/multer.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { auth,admin, roles } from "../../MiddleWare/auth.js";
import { createCategorySchema } from "./category.validation.js";
import validation from "../../MiddleWare/validation.js";
import { endPoints } from "./category.roles.js";
const app =Router();



//create category
app.post('/create',auth(endPoints.create),admin,fileUpload().single('image'),validation(createCategorySchema),asyncHandler(categoryController.createCategory));

//read all category
app.get('/',auth(endPoints.getAll),asyncHandler(categoryController.getAllCategory))

//get category by id
app.get('/getCategory/:id',auth(endPoints.getById),asyncHandler(categoryController.getById))

//update category
app.patch('/update/:id',auth(endPoints.update),fileUpload().single('image'),asyncHandler(categoryController.updateCategory))

//delete category
app.delete('/delete/:id',auth(endPoints.delete),asyncHandler(categoryController.deleteCategory))

export default app;