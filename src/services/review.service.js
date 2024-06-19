import { HttpError } from '../errors/http.error.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ReviewService {
  constructor(reviewRepository, reviewImageRepository, orderRepository) {
    this.reviewRepository = reviewRepository;
    this.reviewImageRepository = reviewImageRepository;
    this.orderRepository = orderRepository;
  }

  createReview = async (orderId, content, images, rating) => {
    const existOrder = await this.orderRepository.findById(+orderId);
    if (!existOrder) {
      throw new HttpError.NotFound(MESSAGES.ORDER.COMMON.NOT_FOUND);
    }

    //TODO : 트랜잭션 추가
    const review = await this.reviewRepository.createReview(orderId, content, rating);
    if (images) {
      for (const image of images) {
        await this.reviewImageRepository.createReviewImage(+review.id, decodeURIComponent(image.location));
      }
    }

    return review;
  };

  updateReview = async (reviewId, content, images, rating) => {
    const existReview = await this.reviewRepository.findById(+reviewId);
    if (!existReview) {
      throw new HttpError.NotFound(MESSAGES.REVIEW.COMMON.NOT_FOUND);
    }

    return await this.reviewRepository.updateReview(+reviewId, content, rating);
  };

  deleteReview = async (reviewId) => {
    const existReview = await this.reviewRepository.findById(+reviewId);
    if (!existReview) {
      throw new HttpError.NotFound(MESSAGES.REVIEW.COMMON.NOT_FOUND);
    }

    const deletedReivew = await this.reviewRepository.deleteById(+reviewId);

    return { id: deletedReivew.id };
  };

  findReviews = async (restaurantId) => {
    const reviews = await this.reviewRepository.findAll(restaurantId);
    return reviews.map((review) => ({
      id: review.id,
      nickname: review.order.user.nickname,
      content: review.content,
      image: review.reviewimage,
      rating: review.rating,
    }));
  };
}
