import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AuthService } from '../services/auth.service.js';
import { AuthController } from '../controllers/auth.controller.js';
import { refreshTokenMiddleware } from '../middlewares/require-refresh-token.middleware.js';

const authRouter = express.Router();

const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

// 회원가입
authRouter.post('/sign_up', authController.signUp);
// 중복 닉네임 체크
authRouter.post('/check-nickname', authController.checkNickname);
// 로그인
authRouter.post('/sign_in', authController.signIn);
// 토큰 재발급
authRouter.post('/tokens', refreshTokenMiddleware(userRepository), authController.reloadToken);

export { authRouter };
