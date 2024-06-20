import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { UserRepository } from '../repositories/user.repository.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';
import { requireRoles } from '../middlewares/require.roles.middleware.js';
import { USER_ROLE } from '../constants/role.constants.js';
import { UserController } from '../controllers/user.controller.js';
import { UserService } from '../services/user.service.js';

const userRouter = express.Router();

const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 회원가입
userRouter.patch(
  '/changed-role/:userId',
  accessTokenMiddleware,
  requireRoles([USER_ROLE.ADMIN]),
  userController.changedRole,
);

export { userRouter };
