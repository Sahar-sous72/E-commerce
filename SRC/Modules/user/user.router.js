import { Router } from "express";
import { asyncHandler } from "../../Utils/catchError.js";
import * as authController from './user.controller.js'

const app=Router();

app.post('/register',asyncHandler(authController.register))

export default app;