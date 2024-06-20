import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { redis } from '../utils/redis.util.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import { AuthService } from '../services/auth.service.js';
import { AuthController } from '../controllers/auth.controller.js';
import { refreshTokenMiddleware } from '../middlewares/require-refresh-token.middleware.js';
import { fileUploadMiddleware } from '../middlewares/file-upload.middleware.js';
import { signUpValidator } from '../middlewares/validators/create-user-validator.middleware.js';
import { signInValidator } from '../middlewares/validators/sign-in-validator.middleware.js';

const authRouter = express.Router();

const authRepository = new AuthRepository(redis);
const userRepository = new UserRepository(prisma);
const authService = new AuthService(userRepository, authRepository);
const authController = new AuthController(authService);
const refreshTokenMiddlewareDi = refreshTokenMiddleware(userRepository, authRepository);

// 회원가입
authRouter.post('/sign-up', fileUploadMiddleware('profile'), signUpValidator, authController.signUp);
// 중복 닉네임 체크
authRouter.post('/check-nickname', authController.checkNickname);
// 로그인
authRouter.post('/sign-in', signInValidator, authController.signIn);
// 토큰 재발급
authRouter.post('/reload-tokens', refreshTokenMiddlewareDi, authController.reloadToken);
// 로그아웃
authRouter.post('/sign-out', refreshTokenMiddlewareDi, authController.signOut);
// 이메일 검증번호 전송
authRouter.post('/verify-email', authController.verifyEmail);
// 이메일 검증번호 확인
authRouter.post('/verify-emailInput', authController.verifyEmailInput);

export { authRouter };
