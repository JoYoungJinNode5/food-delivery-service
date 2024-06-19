import express from 'express';
import { authRouter } from './auth.router.js';
// import { cartRouter } from './cart.router.js';
// import { restaurantRouter } from './restaurant.router.js';
import menuRouter from './menu.router.js';
import { orderRouter } from './order.router.js';
import { reviewRouter } from './review.router.js';
// import { likeRouter } from './like.router.js';
// import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

const apiRouter = express.Router();

// TODO: 미들웨어 삽입 필요
apiRouter.use('/auth', authRouter);
// apiRouter.use('/restaurants', restaurantRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/menus', menuRouter); // 메뉴 라우터 추가
apiRouter.use('/restaurants/:restaurantId/reviews', reviewRouter);
// apiRouter.use('/likes', likeRouter);
// apiRouter.use('/carts', cartRouter);

export { apiRouter };
