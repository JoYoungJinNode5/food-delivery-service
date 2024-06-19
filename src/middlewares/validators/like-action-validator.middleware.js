import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';
import { LIKE_ACTION } from '../../constants/like.constant.js';

const schema = Joi.object({
  action: Joi.string().valid(LIKE_ACTION.LIKE, LIKE_ACTION.UNLIKE).required().messages({
    'any.required': MESSAGES.LIKES.COMMON.ACTION.REQUIRED,
    'any.only': MESSAGES.LIKES.COMMON.ACTION.INVALID_FORMAT,
  }),
});

export const likeActionValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
