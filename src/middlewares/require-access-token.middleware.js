import jwt from 'jsonwebtoken';
import { MESSAGES } from '../constants/message.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { ACCESS_TOKEN_SECRET_KEY } from '../constants/env.constant.js';
import { UserRepository } from '../repositories/user.repository.js';
import { prisma } from '../utils/prisma.util.js';
import { createResponse } from '../utils/response.util.js';

const userRepository = new UserRepository(prisma);

export const accessTokenMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(createResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.COMMON.JWT.NO_TOKEN));
    }

    const [tokenType, token] = authorization.split(' ');
    if (tokenType !== 'Bearer') {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(createResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE));
    }

    if (!token) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(createResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.COMMON.JWT.NO_TOKEN));
    }

    let payload;
    try {
      payload = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY);
    } catch (error) {
      switch (error.name) {
        case 'TokenExpiredError':
          return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json(createResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.COMMON.JWT.EXPIRED));
        default:
          return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json(createResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.COMMON.JWT.INVALID));
      }
    }

    const { id } = payload;
    const whereCondition = { id: +id };
    const user = await userRepository.findByUser(whereCondition);

    if (!user) {
      return res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json(createResponse(HTTP_STATUS.UNAUTHORIZED, MESSAGES.AUTH.COMMON.JWT.NO_USER));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
