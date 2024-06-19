import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";


const schema = Joi.object({
	// name은 문자(string)이어야만 하고, 필수(required)로 입력해야 함
	name: Joi.string().required().messages({
		'any.required': MESSAGES.RESTAURANT.COMMON.NAME,
	}),
	category: Joi.string().required().messages({
		'any.required': MESSAGES.RESTAURANT.COMMON.CATEGORY,
	}),
	address: Joi.string().required().messages({
		'any.required': MESSAGES.RESTAURANT.COMMON.ADDRESS,
	}),
	content: Joi.string().required().messages({
		'any.required': MESSAGES.RESTAURANT.COMMON.CONTENT,
	}),
	openingTime: Joi.string().required(),
	// image는 문자(string)이어야만 하고 필수 입력값은 아님(optional)
	image: Joi.string().optional(),

});


export const createRestaurantValidator = async (req, res, next) => {
	try {
		await schema.validateAsync(req.body);
		next();
	} catch (err) {
		next(err);
	}
}