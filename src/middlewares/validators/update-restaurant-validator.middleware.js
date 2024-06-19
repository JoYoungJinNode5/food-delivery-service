import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const schema = Joi.object({
	name: Joi.string().optional(),
	category: Joi.string().optional(),
	address: Joi.string().optional(),
	content: Joi.string().optional(),
	// name, category, address, content 중 최소한1개(min(1))는 있어야 함
}).min(1).message({
	'object.min': MESSAGES.RESTAURANT.UPDATE.NO_BODY_DATA,
});

export const updateRestaurantValidator = async (req, res, next) => {
	try {
		await schema.validateAsync(req.body);
		next();
	} catch (err) {
		next(err);
	}
}