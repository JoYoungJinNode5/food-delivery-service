import express from 'express';
import { authRouter } from './auth.router.js';
import { userRouter } from './user.router.js';
import { restaurantRouter } from './restaurant.router.js';
import { menuRouter } from './menu.router.js';
import { orderRouter } from './order.router.js';
import { reviewRouter } from './review.router.js';
import { likeRouter } from './like.router.js';

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/restaurants', restaurantRouter);
apiRouter.use('/orders', orderRouter);
apiRouter.use('/restaurants/:restaurantId/menus', menuRouter);
apiRouter.use('/restaurants/:restaurantId/reviews', reviewRouter);
apiRouter.use('/restaurants/:restaurantId/likes', likeRouter);

export { apiRouter };
