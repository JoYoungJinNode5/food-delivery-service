import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { REFRESH_TOKEN_SECRET_KEY } from '../constants/env.constant.js';

export const refreshTokenMiddleware = (userRepository, authRepository) => {
  return async (req, res, next) => {
    try {
      const authorization = req.headers.authorization;
      // Authorization이 없는 경우
      if (!authorization) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: res.statusCode,
          message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
        });
      }
      // JWT 표준 인증 형태와 일치하지 않는 경우
      const [tokenType, token] = authorization.split(' ');

      if (tokenType !== 'Bearer') {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE,
        });
      }
      // 리프레쉬 토큰이 존재하지 않는 경우
      if (!token) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
        });
      }

      const decodedToken = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY);
      const userId = decodedToken.id;
      const whereCondition = { id: userId };
      const user = await userRepository.findByUser(whereCondition);

      if (!user) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NO_USER,
        });
      }

      const safetoken = await authRepository.refreshToken(userId);
      console.log(safetoken);
      if (!safetoken) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: res.statusCode,
          message: '삭제된 토큰입니다.',
        });
      }

      if (!(await bcrypt.compare(token, safetoken))) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: res.statusCode,
          message: MESSAGES.AUTH.COMMON.JWT.DISCARDED_TOKEN,
        });
      }

      req.user = user;
      next();
    } catch (err) {
      switch (err.name) {
        case 'TokenExpiredError':
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            status: res.statusCode,
            message: MESSAGES.AUTH.COMMON.JWT.EXPIRED,
          });
        case 'JsonWebTokenError':
          return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            status: res.statusCode,
            message: MESSAGES.AUTH.COMMON.JWT.INVALID,
          });
        default:
          return res.status(401).json({
            status: res.statusCode,
            message: err.message ?? '비정상적인 요청입니다.',
          });
      }
    }
  };
};
