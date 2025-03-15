import Joi from 'joi';
import { validationErrorResponseData } from '../utils/response.js';
import { validationMessageKey } from '../utils/helper.js';

export const addEditProductValidation = (req, res, callback) => {
  const schema = Joi.object({
    productId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
    name: Joi.string(), // NEED TO PUT REQUIRED
    description: Joi.string().allow(''),
    price: Joi.number().min(0).precision(2), // NEED TO PUT REQUIRED
    stock: Joi.number(),
    category: Joi.string().insensitive().trim().lowercase(), // NEED TO PUT REQUIRED
    tags: Joi.array().items(Joi.string()),
    // eslint-disable-next-line spellcheck/spell-checker
    images: Joi.array().items(Joi.string().uri())
  });

  const { error } = schema.validate(req);
  if (error) {
    return validationErrorResponseData(
      res,
      res.__(validationMessageKey('addProductValidation', error))
    );
  }
  return callback(true);
};

export const deleteProductValidation = (req, res, callback) => {
  const schema = Joi.object({
    productId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
  });
  const { error } = schema.validate(req);
  if (error) {
    return validationErrorResponseData(
      res,
      res.__(validationMessageKey('deleteProductValidation', error))
    );
  }
  return callback(true);
};
