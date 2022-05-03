const Joi = require("joi");

const registrationSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(5).max(10).required(),
  mobilenumber: Joi.string().max(10).required(),
});

const todoSchema = Joi.object({
  Title: Joi.string().required(),
  content: Joi.string().required(),
  user_id: Joi.string().required(),
});

const updateSchema = Joi.object({
  Title: Joi.string().required(),
  content: Joi.string().required(),
});

const updateRegistrationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().trim().email().required(),
  password: Joi.string().min(5).max(10).required(),
  mobilenumber: Joi.string().max(10).required(),
});

module.exports = {
  registrationSchema,
  todoSchema,
  updateSchema,
  updateRegistrationSchema,
};
