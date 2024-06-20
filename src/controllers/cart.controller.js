import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class CartController {
  constructor(cartService) {
    this.cartService = cartService;
  }

  addItemToCart = async (req, res, next) => {
    try {
      const { menuId, restaurantId, quantity } = req.body;
      const data = {
        userId: req.user.id,
        menuId,
        restaurantId,
        quantity,
      };
      const cartItem = await this.cartService.addItemToCart(data);
      return res.status(HTTP_STATUS.CREATED).json({
        status: res.statusCode,
        message: MESSAGES.CART.CREATE.SUCCEED,
        data: cartItem,
      });
    } catch (error) {
      next(error);
    }
  };

  getCartItems = async (req, res, next) => {
    try {
      const cartItems = await this.cartService.getCartItems(req.user.id);
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.CART.READ.SUCCEED,
        data: cartItems,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCartItem = async (req, res, next) => {
    try {
      const cartItemId = parseInt(req.params.cartItemId, 10);
      await this.cartService.deleteCartItem(cartItemId);
      return res.status(HTTP_STATUS.OK).json({
        status: res.statusCode,
        message: MESSAGES.CART.DELETE.SUCCEED,
      });
    } catch (error) {
      next(error);
    }
  };
}
