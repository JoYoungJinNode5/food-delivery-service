import express from 'express';
import { prisma } from '../utils/prisma.util.js';
import { ReviewRepository } from '../repositories/review.repository.js';
import { OrderRepository } from '../repositories/order.repository.js';
import { ReviewService } from '../services/review.service.js';
import { ReviewController } from '../controllers/review.controller.js';
import { createReviewValidator } from '../middlewares/validators/create-review-validator.middleware.js';
import { updateReviewValidator } from '../middlewares/validators/update-review-validator.middleware.js';

const orderRepository = new OrderRepository(prisma);
const reviewRepository = new ReviewRepository(prisma);
const reviewService = new ReviewService(reviewRepository, orderRepository);
const reviewController = new ReviewController(reviewService);

const router = express.Router();

router.post('/', createReviewValidator, reviewController.createReview);
router.patch('/:reviewId', updateReviewValidator, reviewController.updateReview);
router.get('/', reviewController.findReviews);
router.delete('/:reviewId', reviewController.deleteReview);

export default router;
