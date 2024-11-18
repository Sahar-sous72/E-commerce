import Joi from "joi";

export const createCategorySchema={
    body:Joi.object({name:Joi.string().required().messages({
        'string impty':'Category name is required'
    }),image:Joi.string(),
status:Joi.string().valid('active','not-active').default('not-active').messages({'any.only':'status must be active or not-active just'}),
    
//categoryId:Joi.string()
})
}