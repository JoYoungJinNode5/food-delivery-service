import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import { PrismaClient, OrderStatus, DeliverStatus } from '@prisma/client'; // Prisma 클라이언트와 Enum 가져오기

const prisma = new PrismaClient(); // Prisma 클라이언트 인스턴스 생성

export class OrderService {
  constructor(orderRepository, userRepository, menuRepository, cartRepository) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.menuRepository = menuRepository;
    this.cartRepository = cartRepository;
  }

  async createOrderFromCart(userId, address) {
    const cartItems = await this.cartRepository.getCartItems(userId);

    if (cartItems.length === 0) {
      throw new HttpError.BadRequest(MESSAGES.CART.EMPTY);
    }

    // 디버깅 메시지 추가
    console.log('Cart Items:', cartItems);

    const orderItemsData = cartItems.map((item) => {
      // 검증 로직 강화
      if (!item) {
        throw new HttpError.BadRequest('Cart item is undefined');
      }
      if (!item.menu) {
        throw new HttpError.BadRequest('Menu is undefined in cart item');
      }
      if (typeof item.menu.price === 'undefined') {
        throw new HttpError.BadRequest('Price is undefined in menu');
      }
      if (typeof item.quantity === 'undefined') {
        throw new HttpError.BadRequest('Quantity is undefined in cart item');
      }

      return {
        menuId: item.menuId,
        quantity: item.quantity,
        price: item.menu.price,
      };
    });

    // 디버깅 메시지 추가
    console.log('Order Items Data:', orderItemsData);

    // 주문 총 가격 계산
    const totalPrice = orderItemsData.reduce((total, item) => total + item.price * item.quantity, 0);

    // 디버깅 메시지 추가
    console.log('Total Price:', totalPrice);

    // 유저 정보 가져오기
    const user = await this.userRepository.getUserById(userId);
    if (!user) {
      throw new HttpError.NotFound(MESSAGES.USER.NOT_FOUND);
    }

    if (user.point < totalPrice) {
      throw new HttpError.BadRequest(MESSAGES.ORDERS.INSUFFICIENT_POINTS);
    }

    // 디버깅 메시지 추가
    console.log('User:', user);

    // 트랜잭션으로 포인트 차감 및 주문 생성 처리
    try {
      const order = await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            userId,
            restaurantId: cartItems[0].restaurantId,
            orderStatus: OrderStatus.PENDING,
            deliverStatus: DeliverStatus.PENDING,
            totalPrice,
            address,
          },
        });

        const createdOrderItems = await tx.orderItem.createMany({
          data: orderItemsData.map((item) => ({
            ...item,
            orderId: newOrder.id,
          })),
        });

        await tx.user.update({
          where: { id: userId },
          data: { point: user.point - totalPrice },
        });

        await this.cartRepository.clearCart(userId);

        return {
          ...newOrder,
          orderItem: createdOrderItems, // Order와 OrderItems 함께 반환
        };
      });

      return order;
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }

  async cancelOrder(orderId) {
    try {
      return await this.orderRepository.deleteOrder(orderId);
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }

  async getOrderById(orderId) {
    try {
      return await prisma.order.findUnique({
        where: { id: orderId },
        include: {
          orderItem: true, // 올바른 관계 필드명 사용
          user: true,
          restaurant: true,
        },
      });
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }

  async getAllOrders() {
    try {
      return await prisma.order.findMany({
        include: {
          orderItem: true, // 올바른 관계 필드명 사용
          user: true,
          restaurant: true,
        },
      });
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }

  async updateOrderStatus(orderId, orderStatus, deliverStatus) {
    try {
      return await this.orderRepository.updateOrderStatus(orderId, orderStatus, deliverStatus);
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }
}
