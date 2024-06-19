import { prisma } from '../utils/prisma.util.js';

export class OrderRepository {
  async createOrder(data) {
    const { userId, restaurantId, orderStatus, deliverStatus, orderItems } = data;
    return prisma.order.create({
      data: {
        userId,
        restaurantId,
        orderStatus,
        deliverStatus,
        createdAt: new Date(),
        orderItems: {
          create: orderItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
  }

  async cancelOrder(orderId) {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus: 'CANCELLED',
        updatedAt: new Date(),
      },
    });
  }

  async getOrderById(orderId) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true,
      },
    });
  }

  async getAllOrders() {
    return prisma.order.findMany({
      include: {
        orderItems: true,
      },
    });
  }

  async updateOrderStatus(orderId, status) {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus: status,
        updatedAt: new Date(),
      },
    });
  }
}
