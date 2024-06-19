import { OrderService } from '../services/order.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HttpError } from '../errors/http.error.js';

export class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.userRepository = new UserRepository();
  }

  //주문 생성 api
  async createOrder(data) {
    const { userId, restaurantId, orderStatus, deliverStatus, orderItems } = data;

    // 주문 총 가격 계산
    const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    // 유저 정보 가져오기
    const user = await this.userRepository.getUserById(userId);
    if (user.point < totalPrice) {
      throw new HttpError.BadRequest(MESSAGES.ORDERS.INSUFFICIENT_POINTS);
    }

    // 트랜잭션으로 포인트 차감 및 주문 생성 처리
    try {
      const order = await this.orderRepository.createOrderWithTransaction({
        userId,
        restaurantId,
        orderStatus,
        deliverStatus,
        orderItems,
        totalPrice,
        userPoint: user.point - totalPrice,
      });
      return order;
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }

  cancelOrder = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const data = await this.orderService.cancelOrder(orderId);
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.ORDERS.CANCEL.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const data = await this.orderService.getOrderById(orderId);
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.ORDERS.READ_DETAIL.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllOrders = async (req, res, next) => {
    try {
      const data = await this.orderService.getAllOrders();
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.ORDERS.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateOrderStatus = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const { status } = req.body;
      const data = await this.orderService.updateOrderStatus(orderId, status);
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.ORDERS.UPDATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}
