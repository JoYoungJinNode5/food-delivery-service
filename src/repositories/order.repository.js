import { prisma } from '../utils/prisma.util.js';

export class OrderRepository {
  async createOrderWithTransaction(data) {
    const { userId, restaurantId, orderStatus, deliverStatus, orderItems, totalPrice, userPoint, address } = data;

    return prisma.$transaction(async (prisma) => {
      // 유저 포인트 업데이트
      await prisma.user.update({
        where: { id: userId },
        data: { point: userPoint },
      });

      // 주문 생성
      const order = await prisma.order.create({
        data: {
          userId,
          restaurantId,
          orderStatus,
          deliverStatus,
          createdAt: new Date(),
          totalPrice,
          address,
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

      // restaurantLog 업데이트
      await prisma.restaurantLog.create({
        data: {
          orderId: order.id,
          restaurantId,
          price: totalPrice,
          totalPrice: totalPrice,
          createdAt: new Date(),
        },
      });

      return order;
    });
  }

  async deleteOrder(orderId) {
    return prisma.order.delete({
      where: { id: orderId },
    });
  }

  async getOrderById(orderId) {
    return prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: true,
        user: true,
        restaurant: true,
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

  async updateOrderStatus(orderId, orderStatus, deliverStatus) {
    return prisma.order.update({
      where: { id: orderId },
      data: {
        orderStatus,
        deliverStatus,
        updatedAt: new Date(),
      },
    });
  }
}
