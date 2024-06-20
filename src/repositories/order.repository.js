import { prisma } from '../utils/prisma.util.js';

export class OrderRepository {
  constructor(orderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }

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
          totalPrice,
          address,
        },
      });

      await this.orderItemRepository.createOrderItems(order.id, orderItems);

      // restaurantLog 업데이트
      await prisma.restaurantLog.create({
        data: {
          orderId: order.id,
          restaurantId,
          price: totalPrice,
          totalPrice: totalPrice,
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
      },
    });
  }
}

export class MenuRepository {
  async getMenuById(menuId) {
    return prisma.menu.findUnique({
      where: { id: menuId },
    });
  }
}
