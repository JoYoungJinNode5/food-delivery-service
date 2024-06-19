import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { LikeRepository } from '../repositories/like.repository.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { LikeService } from '../services/like.service.js';
import { LikeController } from '../controllers/like.controller.js';
import { likeActionValidator } from '../middlewares/validators/like-action-validator.middleware.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';
const likeRepository = new LikeRepository(prisma);
const restaurantRepository = new RestaurantRepository(prisma);
const likeService = new LikeService(likeRepository, restaurantRepository);
const likeController = new LikeController(likeService);

const likeRouter = express.Router({ mergeParams: true });

likeRouter.post('/', accessTokenMiddleware, likeActionValidator, likeController.likes);

export { likeRouter };
