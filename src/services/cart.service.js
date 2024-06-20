export class CartService {
  constructor(cartRepository) {
    this.cartRepository = cartRepository;
  }

  async addItemToCart(data) {
    return this.cartRepository.addItemToCart(data);
  }

  async getCartItems(userId) {
    return this.cartRepository.getCartItems(userId);
  }

  async deleteCartItem(cartItemId) {
    return this.cartRepository.deleteCartItem(cartItemId);
  }

  async clearCart(userId) {
    return this.cartRepository.clearCart(userId);
  }
}
