import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';

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

    const orderItemsData = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));

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
        restaurantId: cartItems[0].product.restaurantId, // 모든 항목의 restaurantId가 동일하다고 가정
        orderStatus: 'PENDING', // 기본값 설정
        deliverStatus: 'PENDING', // 기본값 설정
        orderItems: orderItemsData,
        totalPrice,
        address,
        userPoint: user.point - totalPrice,
      });

      await this.cartRepository.clearCart(userId);

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

  async updateOrderStatus(orderId, orderStatus, deliverStatus) {
    try {
      return await this.orderRepository.updateOrderStatus(orderId, orderStatus, deliverStatus);
    } catch (error) {
      throw new HttpError.InternalServerError(error.message);
    }
  }
}

//메뉴 리파지토리에서 메뉴 아이디 찾기
export class MenuRepository {
  async getMenuById(menuId) {
    return prisma.menu.findUnique({
      where: { id: menuId },
    });
  }
}
