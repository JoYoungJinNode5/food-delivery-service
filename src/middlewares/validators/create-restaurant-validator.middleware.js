import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const schema = Joi.object({
	name: Joi.string().required().messages({
		'any.required': MESSAGES.RESTAURANT.COMMON.NAME,
	}),
	category: Joi.string().required.messages({
		'any.required': MESSAGES.RESTAURANT.COMMON.CATEGORY,
	}),
	address: Joi.string().required.messages({
		'any.required': MESSAGES.RESTAURANT.COMMON.ADDRESS,
	}),
	content: Joi.string().required().messages({
		'any.required': MESSAGES.RESTAURANT.COMMON.CONTENT,
	}),
	image: Joi.string().optional(),

});

export const createRestaurantValidator = async (req, res, next) => {
	try {
		await schema.validateAsync(req.body);
	} catch (err) {
		next(err);
	}
}