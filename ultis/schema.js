const Joi = require("joi");
module.exports. consultSchema = Joi.object({
    username: Joi.string().required(),
    number: Joi.string().pattern(/^\d{10}$/).required(),
    age: Joi.number().required().min(0),
    email: Joi.string().email().optional(),
    gender: Joi.string().valid("male", "female", "others", "nan").required(),
    disease: Joi.string().required(),
    time: Joi.string().required(),
  });

  module.exports.feedbackSchema = Joi.object({
    username: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    feedback: Joi.string().required().trim(),
    rating: Joi.number().integer().min(1).max(5).required(),
    image: Joi.object({
      path: Joi.string(),
      filename: Joi.string()
    }).optional()
  });