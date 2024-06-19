import express from 'express';
import { prisma } from '../utils/prisma.util';
import { OrderRepository } from '../repositories/order.repository.js';
import { OrderService } from '../services/order.service.js';
import { OrderController } from '../controllers/order.controller.js';

const orderRouter = express.Router();
const orderController = new OrderController();

//메뉴 주문 api
orderRouter.post('/', orderController.createOrder);
//메뉴 주문 취소 api
orderRouter.delete('/:orderId', orderController.cancelOrder);
//메뉴 주문 상세 조회 api
orderRouter.get('/:orderId', orderController.getOrderById);
//주문 내역 상세 조회 api
orderRouter.get('/', orderController.getAllOrders);
//주문 내역 상태 변경 api
orderRouter.patch('/:orderId/status', orderController.updateOrderStatus);

export { orderRouter };
