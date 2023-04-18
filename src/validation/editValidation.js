import validation from "./validation";
import Joi from "joi";

const editSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subTitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),
  state: Joi.string().min(2).max(256).allow(""),
  country: Joi.string().min(2).max(256).required(),
  city: Joi.string().min(2).max(256).required(),
  street: Joi.string().min(2).max(256).required(),
  houseNumber: Joi.string().min(1).max(256).required(),
  zipCode: Joi.number().min(1).max(256).allow(""),
  phone: Joi.string().min(9).max(14).required(),
  createdAt: Joi.string().min(1).max(256).allow(""),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email({ tlds: { allow: false } }),
  web: Joi.string().min(5).max(255).allow(""),
  url: Joi.string().min(6).max(1024).allow(""),
  alt: Joi.string().min(2).max(256).allow(""),
});
const validateEditSchema = (userInput) => validation(editSchema, userInput);
export default validateEditSchema;
