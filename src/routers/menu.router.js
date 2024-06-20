import express from 'express';
import { MenuController } from '../controllers/menu.controller.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import { prisma } from '../utils/prisma.util.js';
import { MenuService } from '../services/menu.service.js';
import { RestaurantService } from '../services/restaurant.service.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';
import { requireRoles } from '../middlewares/require.roles.middleware.js';

const menuRouter = express.Router();

const restaurantRepository = new RestaurantRepository(prisma);
const menuRepository = new MenuRepository(prisma);
const menuService = new MenuService(menuRepository, restaurantRepository);
const menuController = new MenuController(menuService);

// 메뉴 생성 
menuRouter.post('/:restaurantsId/menu', menuController.createMenu);

// 메뉴 수정
menuRouter.put('/:restaurantsId/menu/:menuId', accessTokenMiddleware, requireRoles, menuController.updateMenu);

// 메뉴 삭제
menuRouter.delete('/:restaurantId/menu/:menuId', accessTokenMiddleware, requireRoles, menuController.deleteMenu);

// 메뉴 목록 조회
menuRouter.get('/restaurants/:restaurantId/menu', menuController.getMenus);

export default menuRouter;