import { prisma } from '../utils/prisma.util.js';

export class CartRepository {
  async addItemToCart(data) {
    return prisma.cart.create({
      data: {
        userId: data.userId,
        menuId: data.menuId,
        restaurantId: data.restaurantId,
        quantity: data.quantity,
      },
    });
  }

  async getCartItems(userId) {
    return prisma.cart.findMany({
      where: { userId: userId },
      include: {
        menu: true,
        restaurant: true,
      },
    });
  }

  async deleteCartItem(cartItemId) {
    return prisma.cart.delete({
      where: { id: cartItemId },
    });
  }

  async clearCart(userId) {
    return prisma.cart.deleteMany({
      where: { userId: userId },
    });
  }
}
