import { OrderRepository } from '../repositories/order.repository.js';
import { UserRepository } from '../repositories/user.repository.js'; // 유저 리포지토리 추가
// import { MenuRepository } from '../repositories/menu.repository.js';//메뉴 리포지토리 생성되면 주석 해제
import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';

export class OrderService {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.userRepository = new UserRepository(); // 유저 리포지토리 초기화
    // this.menuRepository = new MenuRepository();
  }

  async createOrder(data) {
    const { userId, restaurantId, orderItems, address } = data;

    const orderItemsData = [];
    for (const item of orderItems) {
      const menuItem = await this.menuRepository.getMenuById(item.menuId); //메뉴 리포지토리 생성되면 주석 해제
      if (!menuItem || menuItem.restaurantId !== restaurantId) {
        throw new HttpError.BadRequest(MESSAGES.ORDERS.INVALID_MENU_ITEM);
      }
      orderItemsData.push({
        productId: item.menuId,
        quantity: item.quantity,
        price: menuItem.price,
      });
    }

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
        orderStatus: 'PENDING', // 기본값 설정
        deliverStatus: 'PENDING', // 기본값 설정
        orderItems: orderItemsData,
        totalPrice,
        address,
        userPoint: user.point - totalPrice,
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
// export class MenuRepository {
//   async getMenuById(menuId) {
//     return prisma.menu.findUnique({
//       where: { id: menuId }
//     });
//   }
// }
