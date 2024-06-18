import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';
import multer from 'multer';
import fs from 'fs';

export class ReviewService {
  constructor(reviewRepository, orderRepository) {
    this.reviewRepository = reviewRepository;
    this.orderRepository = orderRepository;
  }

  createReview = async (userId, orderId, content, image, rating) => {
    const existOrder = await this.orderRepository.findById(orderId);
    if (existOrder) {
      throw new HttpError.NotFound(MESSAGES.ORDER.COMMON.NOT_FOUND);
    }

    return await this.reviewRepository.createReview(userId, orderId, restaurantId, content, image, rating);
  };

  updateReview = async (reviewId, content, image, rating) => {
    const existReview = await this.reviewRepository.findById(reviewId);
    if (existReview) {
      throw new HttpError.NotFound(MESSAGES.REVIEW.COMMON.NOT_FOUND);
    }

    return await this.reviewRepository.updateReview(reviewId, content, image, rating);
  };

  deleteReview = async (reviewId) => {
    const existReview = await this.reviewRepository.findById(reviewId);
    if (existReview) {
      throw new HttpError.NotFound(MESSAGES.REVIEW.COMMON.NOT_FOUND);
    }

    const deletedReivew = await this.reviewRepository.deleteById(reviewId);

    return { id: deletedReivew.id };
  };

  findReviews = async (restaurantId) => {
    const reviews = await this.reviewRepository.findAll(restaurantId);
    reviews = reviews.map((review) => ({
      id: review.id,
      nickname: review.user.nickname,
      content: review.content,
      image: review.reviewimage,
      rating: review.rating,
    }));
  };
}
