import express from 'express';
import { prisma } from '../utils/prisma.util';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { RestaurantService } from '../services/restaurant.service.js';
import { RestaurantController } from '../controllers/restaurant.controller.js';

const restaurantRouter = express.Router();

// RestaurantController 인스턴스화
const restaruantController = new RestaurantController();

// 업장 생성
restaurantRouter.post('/', restaruantController.createRestaurant);

// 업장 정보 수정
restaurantRouter.patch('/:restaurantId', restaruantController.updateRestaurant);

// 업장 상세 조회
restaurantRouter.get('/:restaurantId', restaruantController.getRestaurant);

// 업장 목록 조회
restaurantRouter.get('/', restaruantController.getAllRestaurants);

// 업장 삭제
restaurantRouter.delete('/:restaurantId', restaruantController.deleteRestaurant);


export { restaurantRouter };