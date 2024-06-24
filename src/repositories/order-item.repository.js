import { prisma } from '../utils/prisma.util.js';

export class OrderItemRepository {
  async createOrderItems(orderId, orderItems) {
    return prisma.orderItem.createMany({
      data: orderItems.map((item) => ({
        orderId: orderId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  }

  async getOrderItemsByOrderId(orderId) {
    return prisma.orderItem.findMany({
      where: { orderId: orderId },
    });
  }
}
