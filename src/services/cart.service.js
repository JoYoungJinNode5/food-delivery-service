// import { HttpError } from '../errors/http.error.js';
// import { MESSAGES } from '../constants/message.constant.js';

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
}
