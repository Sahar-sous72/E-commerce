import { Router } from "express";
import * as categoryController from './category.controller.js'
import fileUpload from "../../Utils/multer.js";
import { asyncHandler } from "../../Utils/catchError.js";
import { auth } from "../../MiddleWare/auth.js";
import { createCategorySchema } from "./category.validation.js";
import validation from "../../MiddleWare/validation.js";
const app =Router();



//create category
app.post('/create',fileUpload().single('image'),validation(createCategorySchema),asyncHandler(categoryController.createCategory));

//read all category
app.get('/',asyncHandler(categoryController.getAllCategory))

//get category by id
app.get('/getCategory/:id',asyncHandler(categoryController.getById))

//update category
app.put('/update/:id',fileUpload().single('image'),asyncHandler(categoryController.updateCategory))

//delete category
app.delete('/delete/:id',asyncHandler(categoryController.deleteCategory))

export default app;