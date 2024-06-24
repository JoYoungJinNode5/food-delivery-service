import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { OrderItemRepository } from '../repositories/order-item.repository.js';
import { MenuRepository } from '../repositories/menu.repository.js';
import { OrderService } from '../services/order.service.js';
import { OrderController } from '../controllers/order.controller.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';
import { UserRepository } from '../repositories/user.repository.js';
import { CartRepository } from '../repositories/cart.repository.js';
import { requireRoles } from '../middlewares/require.roles.middleware.js';
import { USER_ROLE } from '../constants/role.constants.js';

const orderRouter = express.Router();
const userRepository = new UserRepository(prisma);
const orderItemRepository = new OrderItemRepository(); // order-item 레포지토리 인스턴스 추가
const orderRepository = new OrderRepository(orderItemRepository); // order-item 레포지토리 주입
const menuRepository = new MenuRepository(); // 메뉴 레포지토리 인스턴스 추가
const cartRepository = new CartRepository();
const orderService = new OrderService(orderRepository, userRepository, menuRepository, cartRepository); //OrderService 괄호 안에 menuRepository 추가
const orderController = new OrderController(orderService);

// 장바구니에서 주문 생성 api
orderRouter.post('/from-cart', accessTokenMiddleware, orderController.createOrderFromCart);
// 메뉴 주문 취소 api
orderRouter.delete('/:orderId', accessTokenMiddleware, orderController.cancelOrder);
// 메뉴 주문 상세 조회 api
orderRouter.get('/:orderId', accessTokenMiddleware, orderController.getOrderById);
// 주문 내역 목록 조회 api
orderRouter.get('/', accessTokenMiddleware, orderController.getAllOrders);
// 주문 내역 상태 변경 api
orderRouter.patch(
  '/:orderId/status',
  accessTokenMiddleware,
  requireRoles([USER_ROLE.MANAGER]),
  orderController.updateOrderStatus,
);

export { orderRouter };
