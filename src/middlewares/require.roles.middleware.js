import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

// 역할인가 미들웨어
export const requireRoles = (roles) => {
	return (req, res, next) => {
		try {
			const user = req.user;
			// 유저가 있으면(true) && 매개변수 roles로 받은 값이 user.role 값을 가졌으면(true) true반환
			// 하나라도 false이면 false 반환
			const hasPermission = user && roles.includes(user.role);
			if (!hasPermission) {
				return res.status(HTTP_STATUS.FORBIDDEN).json({
					status: HTTP_STATUS.FORBIDDEN,
					message: MESSAGES.AUTH.COMMON.FORBIDDEN,
				});
			}

			next();
		} catch (err) {
			next(err);
		}
	}
}