import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HttpError } from '../errors/http.error.js';

export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  createOrderFromCart = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { address } = req.body;
      const order = await this.orderService.createOrderFromCart(userId, address);
      return res.status(HTTP_STATUS.CREATED).json({
        status: res.statusCode,
        message: MESSAGES.ORDERS.CREATE.SUCCEED,
        data: order,
      });
    } catch (error) {
      next(error);
    }
  };

  cancelOrder = async (req, res, next) => {
    try {
      const orderId = parseInt(req.params.orderId, 10); // orderId를 정수로 변환
      await this.orderService.cancelOrder(orderId);
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.ORDERS.CANCEL.SUCCEED,
      });
    } catch (error) {
      next(error);
    }
  };

  getOrderById = async (req, res, next) => {
    try {
      const orderId = parseInt(req.params.orderId, 10); // orderId를 정수로 변환
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
      const userId = req.user.id; // 액세스 토큰에서 가져온 유저 ID
      const data = await this.orderService.getAllOrders(userId);
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
      const orderId = parseInt(req.params.orderId, 10); // orderId를 정수로 변환
      const { orderStatus, deliverStatus } = req.body;
      const data = await this.orderService.updateOrderStatus(orderId, orderStatus, deliverStatus);
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
