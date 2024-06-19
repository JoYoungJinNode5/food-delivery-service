import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { OrderService } from '../services/order.service.js';
import { OrderController } from '../controllers/order.controller.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';
import { UserRepository } from '../repositories/user.repository.js';

const orderRouter = express.Router();
const userRepository = new UserRepository(prisma);
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository, userRepository);
const orderController = new OrderController(orderService);

// 메뉴 주문 api
orderRouter.post('/', accessTokenMiddleware(userRepository), orderController.createOrder);
// 메뉴 주문 취소 api
orderRouter.delete('/:orderId', accessTokenMiddleware(userRepository), orderController.cancelOrder);
// 메뉴 주문 상세 조회 api
orderRouter.get('/:orderId', accessTokenMiddleware(userRepository), orderController.getOrderById);
// 주문 내역 목록 조회 api
orderRouter.get('/', accessTokenMiddleware(userRepository), orderController.getAllOrders);
// 주문 내역 상태 변경 api
orderRouter.patch('/:orderId/status', accessTokenMiddleware(userRepository), orderController.updateOrderStatus);

export { orderRouter };
