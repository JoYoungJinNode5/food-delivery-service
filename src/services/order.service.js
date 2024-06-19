import { OrderRepository } from '../repositories/order.repository.js';
import { HttpError } from '../errors/http.error.js';

export class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
  }

  async createOrder(data) {
    try {
      return await this.orderRepository.createOrder(data);
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }

  async cancelOrder(orderId) {
    try {
      return await this.orderRepository.cancelOrder(orderId);
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }

  async getOrderById(orderId) {
    try {
      return await this.orderRepository.getOrderById(orderId);
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }

  async getAllOrders() {
    try {
      return await this.orderRepository.getAllOrders();
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }

  async updateOrderStatus(orderId, status) {
    try {
      return await this.orderRepository.updateOrderStatus(orderId, status);
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }
}
