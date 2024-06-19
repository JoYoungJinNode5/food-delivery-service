import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';
import { HttpError } from '../errors/http.error.js';

export class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }

  createOrder = async (req, res, next) => {
    try {
      const { restaurantId, orderStatus, deliverStatus, orderItems, address } = req.body;
      const userId = req.user.id; // 액세스 토큰에서 가져온 유저 ID
      const data = await this.orderService.createOrder({
        userId,
        restaurantId,
        orderStatus,
        deliverStatus,
        orderItems,
        address,
      });
      return res.status(HTTP_STATUS.CREATED).json({
        status: res.statusCode,
        message: MESSAGES.ORDERS.CREATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  cancelOrder = async (req, res, next) => {
    try {
      const { orderId } = req.params;
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
      const { orderId } = req.params;
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
