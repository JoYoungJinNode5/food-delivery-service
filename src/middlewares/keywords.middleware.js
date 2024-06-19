import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { KEYWORD } from "../constants/keyword.constants.js";
import { MESSAGES } from "../constants/message.constant.js";

// 키워드 미들웨어
export const requireKeywords = (req, res, next) => {

	try {
		const { keyword } = req.query;
		const keywordsArray = Object.values(KEYWORD);
		// 유저가 있으면(true) && 매개변수 roles로 받은 값이 user.role 값을 가졌으면(true) true반환
		// 하나라도 false이면 false 반환
		if (keyword) {
			const hasPermission = keywordsArray.includes(keyword);
			if (!hasPermission) {
				return res.status(HTTP_STATUS.FORBIDDEN).json({
					status: HTTP_STATUS.FORBIDDEN,
					message: MESSAGES.AUTH.COMMON.FORBIDDEN,
				});
			}
		}

		next();
	} catch (err) {
		next(err);
	}
};
