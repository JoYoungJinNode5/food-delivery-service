import express from 'express';
import { MenuController } from '../controllers/menu.controller.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import { RestaurantRepository } from '../repositories/restaurant.repository.js';
import { prisma } from '../utils/prisma.util.js';
import { MenuService } from '../services/menu.service.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';
import { createMenuValidator } from '../middlewares/validators/create-menu-validator.middleware.js';
import { fileUploadMiddleware } from '../middlewares/file-upload.middleware.js';
import { requireRoles } from '../middlewares/require.roles.middleware.js';
import { USER_ROLE } from '../constants/role.constants.js';

const menuRouter = express.Router({ mergeParams: true });

const menuRepository = new MenuRepository(prisma);
const restaurantRepository = new RestaurantRepository(prisma);
const menuService = new MenuService(menuRepository, restaurantRepository);
const menuController = new MenuController(menuService);

// 메뉴 생성
menuRouter.post(
  '/',
  accessTokenMiddleware,
  requireRoles([USER_ROLE.MANAGER]),
  fileUploadMiddleware('menu'),
  createMenuValidator,
  menuController.createMenu,
);

// 메뉴 수정
menuRouter.put('/:restaurantsId/menu/:menuId', menuController.updateMenu);

// 메뉴 삭제
menuRouter.delete('/:restaurantId/menu/:menuId', menuController.deleteMenu);

// 메뉴 목록 조회
menuRouter.get('/', menuController.findAll);

// 메뉴 상세 조회
menuRouter.get('/:menuId', menuController.findById);

export { menuRouter };

// - **사장님” - 메뉴 CRUD 기능**
//     - “사장님”은 메뉴 정보를 등록 및 수정, 삭제를 할 수 있어야 합니다.
//     - 메뉴 정보는 다음과 같습니다.
//         - 이미지
//         - 메뉴 이름
//         - 가격
//     - 업장 내에서 동일한 메뉴 이름으로는 재등록이 되지 않습니다.
//     - 메뉴 목록은 모두가 볼 수 있어야 합니다.
