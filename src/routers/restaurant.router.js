import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { RestaurantService } from '../services/restaurant.service.js';
import { RestaurantController } from '../controllers/restaurant.controller.js';
import { createRestaurantValidator } from '../middlewares/validators/create-restaurant-validator.middleware.js';
import { updateRestaurantValidator } from '../middlewares/validators/update-restaurant-validator.middleware.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';
import { requireRoles } from '../middlewares/require.roles.middleware.js';
import { USER_ROLE } from '../constants/role.constants.js';
import { requireKeywords } from '../middlewares/keywords.middleware.js';
import { fileUploadMiddleware } from '../middlewares/file-upload.middleware.js';

const restaurantRouter = express.Router();

// RestaurantController 인스턴스화
const restaurantRepository = new RestaurantRepository(prisma);
const restaurantService = new RestaurantService(restaurantRepository);
const restaurantController = new RestaurantController(restaurantService);

// 업장 생성
restaurantRouter.post(
  '/',
  fileUploadMiddleware('restaurant'),
  accessTokenMiddleware,
  requireRoles([USER_ROLE.MANAGER]),
  createRestaurantValidator,
  restaurantController.createRestaurant,
);

// 업장 정보 수정
restaurantRouter.patch(
  '/:restaurantId',
  accessTokenMiddleware,
  requireRoles([USER_ROLE.MANAGER]),
  updateRestaurantValidator,
  restaurantController.updateRestaurant,
);

// 업장 상세 조회
restaurantRouter.get('/:restaurantId', restaurantController.getRestaurant);

// 키워드 기반 업장 목록 조회
restaurantRouter.get('/', requireKeywords, restaurantController.getAllRestaurants);

// 업장 삭제
restaurantRouter.delete(
  '/:restaurantId',
  accessTokenMiddleware,
  requireRoles([USER_ROLE.MANAGER]),
  restaurantController.deleteRestaurant,
);

export { restaurantRouter };
