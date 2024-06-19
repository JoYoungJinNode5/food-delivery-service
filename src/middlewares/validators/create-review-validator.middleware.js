import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import { MIN_REVIEW_RATING } from '../../constants/review.constant.js';
// import { jsonParser } from '../../utils/file-upload.util.js';

const schema = Joi.object({
  orderId: Joi.number().integer().required().messages({
    'any.required': MESSAGES.REVIEW.COMMON.ORDER.REQUIRED,
  }),
  content: Joi.string().messages(),
  image: Joi.array().items(Joi.string().messages()),
  rating: Joi.number().integer().max(MIN_REVIEW_RATING).required().messages({
    'any.required': MESSAGES.REVIEW.COMMON.RATING.REQUIRED,
  }),
});

export const createReviewValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
