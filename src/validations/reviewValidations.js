import Joi from 'joi';
import { validationErrorResponseData } from '../utils/response.js';
import { validationMessageKey } from '../utils/helper.js';

export const addProductReviewValidation = (req, res, callback) => {
  const schema = Joi.object({
    rating: Joi.number().integer().min(1).max(5).required(),
    comment: Joi.string().trim().min(3).required()
  });

  const { error } = schema.validate(req);
  if (error) {
    return validationErrorResponseData(
      res,
      res.__(validationMessageKey('addProductReviewValidation', error))
    );
  }
  return callback(true);
};
