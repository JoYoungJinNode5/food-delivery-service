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
const restaurantRouter = express.Router();

// RestaurantController 인스턴스화
const restaruantController = new RestaurantController();

// 업장 생성
restaurantRouter.post('/', accessTokenMiddleware, requireRoles([USER_ROLE.MANAGER]), createRestaurantValidator, restaruantController.createRestaurant);

// 업장 정보 수정
restaurantRouter.put('/:restaurantId', accessTokenMiddleware, requireRoles([USER_ROLE.MANAGER]), updateRestaurantValidator, restaruantController.updateRestaurant);

// 업장 상세 조회
restaurantRouter.get('/:restaurantId', restaruantController.getRestaurant);

// 업장 목록 조회
restaurantRouter.get('/', restaruantController.getAllRestaurants);

// 업장 삭제
restaurantRouter.delete('/:restaurantId', accessTokenMiddleware, requireRoles([USER_ROLE.MANAGER]), restaruantController.deleteRestaurant);


export { restaurantRouter };