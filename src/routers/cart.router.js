import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { CartRepository } from '../repositories/cart.repository.js';
import { CartService } from '../services/cart.service.js';
import { CartController } from '../controllers/cart.controller.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';

const cartRouter = express.Router();
const cartRepository = new CartRepository(prisma);
const cartService = new CartService(cartRepository);
const cartController = new CartController(cartService);

// 장바구니 추가 api
cartRouter.post('/', accessTokenMiddleware, cartController.addItemToCart);
// 장바구니 조회 api
cartRouter.get('/', accessTokenMiddleware, cartController.getCartItems);
// 장바구니 항목 삭제 api
cartRouter.delete('/:cartItemId', accessTokenMiddleware, cartController.deleteCartItem);

export { cartRouter };
