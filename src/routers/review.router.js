import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { ReviewRepository } from '../repositories/review.repository.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { ReviewService } from '../services/review.service.js';
import { ReviewController } from '../controllers/review.controller.js';
import { createReviewValidator } from '../middlewares/validators/create-review-validator.middleware.js';
import { updateReviewValidator } from '../middlewares/validators/update-review-validator.middleware.js';
import { accessTokenMiddleware } from '../middlewares/require-access-token.middleware.js';
import { fileUploadMiddleware } from '../middlewares/file-upload.middleware.js';
import { ReviewImageRepository } from '../repositories/review-image.repository.js';

const orderRepository = new OrderRepository(prisma);
const reviewRepository = new ReviewRepository(prisma);
const reviewImageRepository = new ReviewImageRepository(prisma);
const reviewService = new ReviewService(reviewRepository, reviewImageRepository, orderRepository);
const reviewController = new ReviewController(reviewService);
const reviewRouter = express.Router();

reviewRouter.post(
  '/',
  accessTokenMiddleware,
  fileUploadMiddleware('review'),
  createReviewValidator,
  reviewController.createReview,
);
reviewRouter.patch(
  '/:reviewId',
  accessTokenMiddleware,
  fileUploadMiddleware('review'),
  updateReviewValidator,
  reviewController.updateReview,
);
reviewRouter.get('/', reviewController.findReviews);
reviewRouter.delete('/:reviewId', accessTokenMiddleware, reviewController.deleteReview);

export { reviewRouter };
