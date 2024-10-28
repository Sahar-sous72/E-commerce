import { Router } from "express";
import { asyncHandler } from "../../Utils/catchError.js";
import * as authController from './user.controller.js'
import { LoginSchema, registerSchema } from "./user.validation.js";
import validation from './../../MiddleWare/validation.js';
import fileUpload from "../../Utils/multer.js";
import {auth,admin} from './../../MiddleWare/auth.js'
const app=Router();

app.post('/register',fileUpload().single('image'),validation(registerSchema),asyncHandler(authController.register))
app.post('/',validation(LoginSchema),asyncHandler(authController.login))
app.get('/getCategories',auth,admin,asyncHandler(authController.getCategories))
export default app;