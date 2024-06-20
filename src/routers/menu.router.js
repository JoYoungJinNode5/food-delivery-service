import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import { MenuService } from '../services/menu.service.js';
import { MenuController } from '../controllers/menu.controller.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';

const menuRouter = express.Router();
const menuRepository = new MenuRepository(prisma);
const menuService = new MenuService(menuRepository);
const menuController = new MenuController(menuService);

// 메뉴 생성 api
menuRouter.post('/menus', accessTokenMiddleware, menuController.createMenu);
// 메뉴 수정 api
menuRouter.patch('/menus/:menuId', accessTokenMiddleware, menuController.updateMenu);
// 메뉴 상세 조회 api
menuRouter.get('/menus/:menuId', menuController.getMenuById);
// 메뉴 목록 조회 api
menuRouter.get('/menus', menuController.getAllMenus);
// 메뉴 삭제 api
menuRouter.delete('/menus/:menuId', accessTokenMiddleware, menuController.deleteMenu);

export { menuRouter };
