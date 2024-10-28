import joi from 'joi';
import { generalFields } from '../../MiddleWare/validation.js';

//register vlidation
export const registerSchema ={
    body: joi.object({
    userName:joi.string().min(3).max(40).required().messages({
        'string.empty':'username is required'
    }),
    password:generalFields.password,
    email:generalFields.email,
    gender:joi.valid('Male','Female'),
    role:joi.valid('user','admin'),
    status:joi.valid('active','not-active'),
    address:joi.string().min(2).max(40)
   // cpassword:Joi.valid(Joi.ref('password')).required()
})
}


//log in validation

export const LoginSchema ={
    body:  joi.object({
      email:generalFields.email,
      password:generalFields.password
  })
  }
