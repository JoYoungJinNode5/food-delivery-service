import Joi from 'joi';
import { MESSAGES } from '../../constants/message.constant.js';

const schema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': MESSAGES.MENU.COMMON.NAME.REQUIRED,
  }),
  price: Joi.number().integer().required().messages({
    'any.required': MESSAGES.MENU.COMMON.PRICE.REQUIRED,
  }),
  content: Joi.string().required().messages({
    'any.required': MESSAGES.MENU.COMMON.CONTENT.REQUIRED,
  }),
});

export const createMenuValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};
